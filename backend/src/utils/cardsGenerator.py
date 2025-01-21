import random
from datetime import datetime, timedelta


def luhn_checksum(number):
    digits = [int(d) for d in str(number)]
    for i in range(len(digits) - 2, -1, -2):
        digits[i] *= 2
        if digits[i] > 9:
            digits[i] -= 9
    checksum = sum(digits)
    return (10 - (checksum % 10)) % 10


def generate_card_number(bin_prefix, length=16):
    card_number = [int(d) for d in str(bin_prefix)]
    while len(card_number) < length - 1:
        card_number.append(random.randint(0, 9))
    checksum = luhn_checksum(''.join(map(str, card_number)))
    card_number.append(checksum)
    return ''.join(map(str, card_number))


def generate_card_expiration_date(term):
    if isinstance(term, range):
        year = random.choice(term)
    month = random.randint(1, 12)

    return datetime(datetime.now().year + year, month, 1).strftime('%Y-%m-%d')


def generate_card():
    return {
        'number': generate_card_number(404665),
        'expiration-date': generate_card_expiration_date(range(4, 6)),
        'ccv': random.randint(100, 999)
    }
