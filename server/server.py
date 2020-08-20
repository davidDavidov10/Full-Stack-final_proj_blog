from flask import Flask, request, g, make_response, abort, Response
from flask_mail import Mail, Message
import mysql.connector.pooling
import uuid
import bcrypt
import json
from configparser import ConfigParser
from datetime import datetime
from datetime import timedelta

parser = ConfigParser()
parser.read('dev.ini')

pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    host=parser.get('dbDetails', 'host'),
    user=parser.get('dbDetails', 'user'),
    passwd=parser.get('dbDetails', 'password'),
    database=parser.get('dbDetails', 'dbname'),
    pool_size=3
)

app = Flask(__name__,
            static_folder='/home/ubuntu/build',
            static_url_path='/')

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=parser.get('systemEmail', 'email'),
    MAIL_PASSWORD=parser.get('systemEmail', 'password')
)

mail = Mail(app)


@app.before_request
def before_request():
    g.db = pool.get_connection()


@app.teardown_request
def teardown_request(exception):
    g.db.close()


@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file('index.html')


@app.route('/api/alive')
def api_alive():
    return 'alive'


@app.route('/')
def index():
    return app.send_static_file('index.html')


#############################LOGS################################
@app.route('/api/signup', methods=['POST'])
def manage_signup():
    return add_user()


@app.route('/api/login', methods=['POST', 'GET'])
def mange_login():
    if request.method == 'GET':
        return check_login()
    else:
        return login()


@app.route('/api/logout', methods=['POST'])
def manage_logout():
    return logout()


def check_login():
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    query = "select user_id from sessions where session_id = %s"
    values = (session_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        abort(401)
    user_id = record[0]
    cursor.close()
    return get_user(user_id)


def login():
    data = request.get_json()

    if data["social_login"]:
        query = "select id,email from users where email =%s"
        values = (data["email"],)

    else:
        query = "select id,password from users where name =%s"
        values = (data['userName'],)

    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        abort(401)

    if not data["social_login"]:
        hashed_pwd = record[1].encode('utf-8')
        if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
            abort(401)

    user_id = record[0]
    session_id = str(uuid.uuid4())
    query = "insert into sessions (user_id, session_id) values (%s,%s) on duplicate key update session_id=%s"
    values = (user_id, session_id, session_id)
    cursor.execute(query, values)
    g.db.commit()
    response = make_response(get_user(user_id))
    response.set_cookie("session_id", session_id)
    cursor.close()
    return response


def logout():
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    query = "delete from sessions where session_id=%s"
    values = (session_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    response = make_response()
    response.set_cookie('session_id', '', expires=0)
    cursor.close()
    return response


##################user_managment######################
@app.route('/api/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        return get_all_users()
    else:
        return add_user()


@app.route('/api/user/posts', methods=['GET', ])
def user_posts():
    return get_all_user_posts()


def get_all_users():
    query = "select id,name,email from users"
    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['id', 'name']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    cursor.close()
    return json.dumps(data)


def get_user(user_id):
    print("user_id", user_id)
    query = "select id,name,email from users where id =%s"
    values = (user_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    print("record = ", record)
    header = ['id', 'name', 'email']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


def add_user():
    data = request.get_json()
    print(data)
    if data['password']:
        pwd = data['password']
        hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
        query = "insert into users (name, email,password,img) values (%s, %s, %s,%s)"
        values = (data['user_name'], data['email_address'], hashed_pwd, data['dataBaseImgUrl'])
    else:
        query = "insert into users (name, email) values (%s, %s)"
        values = (data['user_name'], data['email_address'])

    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_user_id = cursor.lastrowid
    cursor.close()

    return get_user(new_user_id)


##################post_managment######################
@app.route('/api/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_published_posts()
    else:
        return add_post()


@app.route('/api/post/<post_id>', methods=['GET', 'POST', 'DELETE'])
def manage_post(post_id):
    if request.method == 'GET':
        return get_post(post_id)
    if request.method == 'POST':
        return set_post(post_id)
    if request.method == 'DELETE':
        return delete_post(post_id)


@app.route('/api/post/<post_id>/phases', methods=['POST'])
def manage_post_phases(post_id):
    return set_phase(post_id)


def get_all_published_posts():
    query = "select posts.id, posts.title, posts.content,users.name, posts.published, posts.published_at, " \
            "posts.author_id, users.img from posts join users on posts.author_id=users.id " \
            "where published is true " \
            "order by published_at DESC"

    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author_name', 'published', 'published_at', 'author_id', 'img']
    data = []
    for itear, record in enumerate(records):
        data.append(dict(zip(header, record)))
        data[itear]['published_at'] = record[5].strftime("%m/%d/%Y, %H:%M")
        data[itear]['likes'] = get_all_likes(data[itear]['id'])

    return json.dumps(data)


@app.route('/api/threeMostPopular', methods=['GET'])
def get_likes():
    query = "select post_id, posts.title , count(post_id) as number_of_likes" \
            " from posts_like join posts " \
            "where posts_like.post_id =posts.id and posts.published=1" \
            " group by post_id order by number_of_likes DESC LIMIT 3"
    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['post_id', 'post_title', 'number_of_likes']
    data = []
    for record in records:
        data.append(dict(zip(header, record)))
    cursor.close()
    print(json.dumps(data))
    return json.dumps(data)

def get_post(post_id):
    query = "select posts.id, posts.title, posts.content,users.name, posts.published, posts.author_id, " \
            "users.img, posts.published_at from posts join users on posts.author_id=users.id where posts.id=%s "
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    post_id = record[0]

    header = ['id', 'title', 'content', 'author_name', 'published', 'author_id', 'img']
    post = dict(zip(header, record))
    post['published_at'] = record[7].strftime("%m/%d/%Y, %H:%M")

    comments = json.loads(get_all_comments(post_id))
    post['comments'] = comments

    likes = json.loads(get_all_likes(post_id))
    post['likes'] = likes

    cursor.close()
    return json.dumps(post)


def add_post():
    user = json.loads(check_login())
    data = request.get_json()
    query = "insert into posts (title,content,author_id) values (%s,%s,%s)"
    values = (data['title'], data['content'], user['id'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return get_post(new_post_id)


def get_all_user_posts():
    user = json.loads(check_login())

    query = "select posts.id, posts.title, posts.content, " \
            "users.name, users.img, posts.published_at, posts.published, " \
            "posts.author_id from posts join users on posts.author_id=users.id " \
            "where posts.author_id=%s " \
            "order by published_at DESC"
    values = (user['id'],)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author_name', 'img']
    data = []
    for itear, record in enumerate(records):
        data.append(dict(zip(header, record)))
        data[itear]['published_at'] = record[5].strftime("%m/%d/%Y, %H:%M")
    cursor.close()
    return json.dumps(data)





def delete_post(post_id):
    user = json.loads(check_login())
    post = json.loads(get_post(post_id))
    if not post['author_id'] == user['id']:
        abort(401)

    delete_comments_from_post(post_id)
    delete_likes_from_post(post_id)
    query = "delete from posts where id=%s"
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return json.dumps([{'response': "deleted post"}])


def set_post(post_id):
    user = json.loads(check_login())
    post = json.loads(get_post(post_id))
    if not post['author_id'] == user['id']:
        abort(401)

    data = request.get_json()
    query = "update posts set title = %s, content = %s where id = %s"
    values = (data['title'], data['content'], post_id)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return get_post(post_id)


def set_phase(post_id):
    user = json.loads(check_login())
    post = json.loads(get_post(post_id))
    if not post['author_id'] == user['id']:
        abort(401)
    query = "update posts set published = %s where id = %s"
    if post['published']:
        values = (False, post_id)
    else:
        values = (True, post_id)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return get_post(post_id)


##################likes######################
@app.route('/api/post/<post_id>/likes', methods=['GET', 'POST', 'DELETE'])
def manage_likes(post_id):
    if request.method == 'GET':
        return get_all_likes(post_id)
    if request.method == 'POST':
        return add_like(post_id)
    if request.method == 'DELETE':
        return delete_like(post_id)


def get_all_likes(post_id):
    query = "select posts_like.user_id, users.name " \
            "from posts_like join users on posts_like.user_id=users.id " \
            "where post_id =%s"
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['user_id', 'user_name']
    data = []
    for record in records:
        data.append(dict(zip(header, record)))
    cursor.close()
    return json.dumps(data)


def add_like(post_id):
    user = json.loads(check_login())
    query = "insert into posts_like(post_id, user_id) values(%s, %s)"
    values = (post_id, user['id'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return json.dumps([{'response': "like updated"}])


def delete_like(post_id):
    user = json.loads(check_login())
    query = "delete from posts_like where post_id=%s and user_id=%s"
    values = (post_id, user['id'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return json.dumps([{'response': "unlike updated"}])


##################comments######################
@app.route('/api/post/<post_id>/comments', methods=['GET', 'POST'])
def manage_comments(post_id):
    if request.method == 'GET':
        return get_all_comments(post_id)
    else:
        return add_comment(post_id)


def get_all_comments(post_id):
    query = "select comments.id, comments.post_id, users.name," \
            " comments.content, users.img, comments.published_at" \
            " from comments join users on comments.author_id=users.id" \
            " where post_id=%s  order by published_at DESC "
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['id', 'post_id', 'user_name', 'content', 'img', 'published_at']
    data = []
    for itear, record in enumerate(records):
        data.append(dict(zip(header, record)))
        data[itear]['published_at'] = record[5].strftime("%m/%d/%Y, %H:%M")
    cursor.close()
    return json.dumps(data)


def add_comment(post_id):
    user = json.loads(check_login())
    data = request.get_json()
    query = "insert into comments (post_id,author_id,content) values (%s,%s,%s)"
    values = (post_id, user['id'], data['content'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_comment_id = cursor.lastrowid
    cursor.close()
    return get_comment(new_comment_id)


def get_comment(comment_id):
    query = "select comments.id, comments.post_id, users.name," \
            " comments.content, users.img, comments.published_at, comments.author_id " \
            "from comments join users on comments.author_id=users.id where comments.id=%s"

    values = (comment_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    header = ['id', 'post_id', 'user_name', 'content', 'img']
    comment = dict(zip(header, record))

    comment['published_at'] = record[5].strftime("%m/%d/%Y, %H:%M")
    cursor.close()
    return json.dumps(comment)


def delete_comments_from_post(post_id):
    query = "delete from comments where post_id=%s"
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return json.dumps([{'response': "deleted comment"}])


def delete_likes_from_post(post_id):
    query = "delete from posts_like where post_id=%s"
    values = (post_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return json.dumps([{'response': "deleted comment"}])


######forget my password#######
@app.route('/api/password_rest', methods=['POST'])
def manage_password_rest_email():
    if request.method == 'POST':
        return password_reset_email()


def password_reset_email():
    data = request.get_json()
    query = "select email from users where email = %s"
    user_email = data['email']
    values = (user_email,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()

    if not record:
        abort(401)
    check_reset_validation(user_email)

    token = str(uuid.uuid4())
    query = "insert into  passwords_to_reset(email, token) " \
            "values(%s, %s)" \
            " on duplicate key update " \
            "token = %s, " \
            "number_of_attempts = number_of_attempts + 1"

    values = (user_email, token, token)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()

    cursor.close()
    msg = Message("[Blog] Please rest your password",
                  sender="forgetpassblog@gmail.com",
                  recipients=[user_email])

    url = 'http://localhost:3000/password_reset/'
    msg.body = "we heard that you lost your BLOG password. sorry about that!\n" \
               "But don't worry! You can use the following link to reset your password : \n" \
               "{0}\n" \
               "if you don't use this link within 3 hours, it will expire.\n" \
               "To get a new password reset link, visit: {1}" \
               "Thanks,\n" \
               "The BLOG Team".format(url + token, url)

    mail.send(msg)
    return json.dumps([{'response': "email sent"}])


# check if the user do not exceeds 3 attempts to reset password
def check_reset_validation(email):
    query = "select number_of_attempts,last_update from passwords_to_reset where email = %s"
    cursor = g.db.cursor()
    values = (email,)
    cursor.execute(query, values)
    record = cursor.fetchone()

    if record:
        number_of_attempts = record[0]
        last_update = record[1]
        next_time = last_update + timedelta(hours=3)
        if number_of_attempts > 3:
            if datetime.now() < next_time:
                msg = json.dumps({'msg': "exceed max reset attempts, try again at {0}".format(next_time)})
                abort(Response(msg, 401))
            else:
                query = "Update passwords_to_reset Set number_of_attempts = %s where email =%s"
                values = (0, email)
                cursor = g.db.cursor()
                cursor.execute(query, values)
                g.db.commit()
    cursor.close()


@app.route('/api/password_rest/<token>', methods=['POST'])
def manage_password_rest(token):
    if request.method == 'POST':
        return password_reset(token)


def password_reset(token):
    try:
        user_email = check_token(token)
        query = "delete from passwords_to_reset where token = %s"
        values = (token,)
        cursor = g.db.cursor()
        cursor.execute(query, values)
        g.db.commit()

        data = request.get_json()
        pwd = data['password']
        print(pwd)
        hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
        query = "update users set password = %s WHERE email= %s"
        values = (hashed_pwd, user_email)
        cursor = g.db.cursor()
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
    finally:
        updateResetTable()
    return json.dumps([{'response': "email sent"}])


def check_token(token):
    query = "select email,last_update from passwords_to_reset where token = %s"
    values = (token,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()

    if not record:
        msg = json.dumps({'msg': "there is no such token"})
        abort(Response(msg, 401))

    elif record[1] < datetime.now() - timedelta(hours=3):
        msg = json.dumps({'msg': "token expired"})
        abort(Response(msg, 401))

    user_email = record[0]
    cursor.close()
    return user_email


def updateResetTable():
    #  remove all tokens that exceeds 3 hours
    query = "delete from passwords_to_reset where now()- interval 3 hour > last_update"
    cursor = g.db.cursor()
    cursor.execute(query, )
    g.db.commit()
    cursor.close()


@app.route('/api/postSearch/<wordToSearch>', methods=['GET'])
def manage_search_post(wordToSearch):
    print(wordToSearch)
    query = "select posts.id, posts.title, posts.content,users.name, posts.published, posts.published_at, " \
            "posts.author_id from posts join users on posts.author_id=users.id where published is true AND " \
            "lower(content) REGEXP %s "

    values = (wordToSearch,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()

    header = ['id', 'title', 'content', 'author_name', 'published']
    data = []
    for itear, record in enumerate(records):
        data.append(dict(zip(header, record)))
        data[itear]['published_at'] = record[5].strftime("%m/%d/%Y, %H:%M")
    cursor.close()
    print(json.dumps(data))
    return json.dumps(data)


if __name__ == "__main__":
    app.run()
