CREATE TYPE roles AS ENUM ('admin', 'client');
CREATE TYPE loan_status AS ENUM ('pending', 'approved', 'rejected', 'paid');
CREATE TYPE card_type AS ENUM ('credit', 'debit');
CREATE TYPE card_status AS ENUM ('active', 'pending', 'blocked');


CREATE TABLE Users(
    id_user SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(320) NOT NULL UNIQUE,
    password text NOT NULL,
    user_role roles NOT NULL,
    monthlyIncome numeric(15, 2),
    occupation varchar(255),
    sourceOfIncome varchar(255)
);


CREATE TABLE Loan(
    id_loan SERIAL PRIMARY KEY,
    purpose varchar(255),
    amount numeric(15, 2) NOT NULL,
    interest_rate numeric(5, 4) NOT NULL,
    term integer NOT NULL,
    status loan_status NOT NULL DEFAULT 'pending',
    owner integer REFERENCES Users(id_user)
);


CREATE TABLE Card(
    id_card SERIAL PRIMARY KEY,
    type card_type NOT NULL, 
    card_number varchar(19) UNIQUE NOT NULL,
    expiration_date date NOT NULL,
    ccv varchar(4) NOT NULL,
    balance numeric(15, 2) NOT NULL,
    credit_limit numeric(15, 2) NOT NULL,
    status card_status NOT NULL DEFAULT 'pending',
    owner integer REFERENCES Users(id_user)
);

----------------------------------------------------------------------------------------------------------------------------------
INSERT INTO users (name, email, password, user_role) VALUES ('Administrator', 'admin@mybank.com', 'scrypt:32768:8:1$gspA3k7hEkCC9tkL$cb3708950ac78c075ee96cff1f20d7b2a01c78ee80ceafd46e6e8601bb527f256e0a9cf9be21a450c891dbc3da3be8fabcd647385ebd10d6f72615f57622c373', 'admin');
INSERT INTO users (name, email, password, user_role) VALUES ('John Doe', 'john.doe@mybank.com', 'scrypt:32768:8:1$oRDCAnNJUnw7oqdj$03fd249fdaa21673e9587c35f2190f8e89e4a6c62b2002511eee0fe2f02e0b549b374c85e2838e111638166dc49e77a749aa3a61efcd94bf23d08c85fd690d39', 'client');

INSERT INTO card (type, card_number, expiration_date, ccv, balance, credit_limit, owner)
VALUES ('debit', '1234 5678 9012 3400', '2030-01-01', '234', 1000.34, 1000.34, 1);
INSERT INTO card (type, card_number, expiration_date, ccv, balance, credit_limit, owner)
VALUES ('credit', '1234 5678 9012 3402', '2030-03-01', '234', 1000.34, 1000.34, 1);
INSERT INTO card (type, card_number, expiration_date, ccv, balance, credit_limit, owner)
VALUES ('debit', '1234 5678 9012 3401', '2030-02-01', '234', 5027.80, 5027.80, 2);
INSERT INTO card (type, card_number, expiration_date, ccv, balance, credit_limit, owner)
VALUES ('credit', '1234 5678 9012 3403', '2030-04-01', '234', 1000.34, 1000.34, 2);

INSERT INTO loan (purpose, amount, interest_rate, term, owner)
VALUES ('Investment', 10000, 0.05, 18, 1);
INSERT INTO loan (purpose, amount, interest_rate, term, owner)
VALUES ('Investment', 3000, 0.02, 6, 1);
INSERT INTO loan (purpose, amount, interest_rate, term, owner)
VALUES ('Personal', 4000, 0.07, 12, 2);
INSERT INTO loan (purpose, amount, interest_rate, term, owner)
VALUES ('Auto', 7000, 0.03, 24, 2);

