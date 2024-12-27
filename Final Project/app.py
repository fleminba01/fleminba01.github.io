# app.py

from flask import Flask, request, jsonify, render_template
import psycopg2

app = Flask(__name__)

def get_db_connection():
    connection = psycopg2.connect(
        host='localhost',
        database='job_tracker',
        user='postgres',
        password='Angel-Lynn16'
    )
    return connection

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/applications', methods=['GET', 'POST'])
def applications():
    connection = get_db_connection()
    cursor = connection.cursor()

    if request.method == 'POST':
        data = request.json
        job_title = data['jobTitle']
        company = data['company']
        status = data['status']

        cursor.execute('''INSERT INTO applications (job_title, company, status)
                          VALUES (%s, %s, %s)''', (job_title, company, status))
        connection.commit()
        connection.close()
        return jsonify({"message": "Application added successfully"})

    if request.method == 'GET':
        cursor.execute('SELECT * FROM applications')
        applications = cursor.fetchall()
        connection.close()

        return jsonify(applications)

if __name__ == '__main__':
    app.run(debug=True)
