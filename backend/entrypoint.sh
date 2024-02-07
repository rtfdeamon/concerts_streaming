#!/bin/sh

cd /home/app && \
python3 waitport.py "${DATABASE_HOST}" 3306 && \
python3 prepare_s3.py && \
python3 manage.py migrate && \
python3 manage.py createsuperuser \
  --noinput \
  --email "${DJANGO_SUPERUSER_EMAIL}" \
  --username "${DJANGO_SUPERUSER_USERNAME}" || true && \
python3 manage.py runserver 0.0.0.0:8080