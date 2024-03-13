import sys
import time
import socket

ATTEMPTS_LIMIT = 10
ATTEMPTS_DELAY = 10

if __name__ == '__main__':
    attempts = 0
    connected = False
    host = sys.argv[1]
    port = sys.argv[2]

    while attempts < ATTEMPTS_LIMIT:
        try:
            sock = socket.socket()
            sock.connect((host, int(port)))
            sock.close()
            connected = True
            break
        except socket.error as e:
            attempts += 1
            print('Got {}. Retry'.format(str(e)))
            time.sleep(ATTEMPTS_DELAY)
    if connected:
        print('Connected')
    else:
        print('Unable to connect {} {}'.format(host, port))
        sys.exit(1)
