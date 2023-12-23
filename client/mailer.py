import requests
import threading

# ElasticMail API details
url = "https://api.elasticemail.com/v2/email/send"
api_key = "4E083351E89DB4A29D59FB9157C04238DDC775278FD982E86ACCFAAD466F504F8F7135BFBF0A2B6224065C5EDB3DF1D2"

# MAILGUN_API_KEY = "a0910e750a310f3467f093bed02bfa7f-4b98b89f-351c4c12"
# MAILGUN_DOMAIN = "sandbox643660eebf32493bbee0c1309a0fcc9a.mailgun.org"


def send_request(url, payload):
    response = requests.post(url, data=payload)
    print(response.content.decode("utf-8"))


def send_email(subject, text, to_email, html_content=None):
    print(to_email)
    payload = {
        "apikey": api_key,
        "from": "hello@startupearly.com",
        "to": to_email,
        "subject": subject,
        "bodyHtml": text,
    }

    thread = threading.Thread(target=send_request, args=(url, payload))
    thread.start()
    # response = requests.post(url, auth=auth, data=data)
    # print(response.content.decode("utf-8"))
