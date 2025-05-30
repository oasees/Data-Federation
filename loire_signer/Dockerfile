FROM python:3.10-alpine

# Set environment varibles
ENV PORT 8500

COPY ./app /code/app
COPY ./requirements.txt /code/app/requirements.txt
# RUN chmod 664 /code/app/model/model.tflite

# Install dependencies
RUN pip3 install psycopg2-binary
RUN pip3 install -r /code/app/requirements.txt

WORKDIR /code/

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
