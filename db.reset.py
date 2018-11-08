import sqlite3

if __name__ == '__main__':
    try:
        con = sqlite3.connect('../database.db')
        cur = con.cursor()
        cur.execute('DELETE FROM user')
        cur.execute('DELETE FROM userActions')
        cur.execute('UPDATE sqlite_sequence SET seq = 0')
        cur.execute('INSERT INTO user (username) VALUES ("sudo")')
        con.commit()
        print("ALl dont resetting and stuff")
    except Exception as e:
        print(e)

