# Accounting Software Module 4

## Overview
This project is a lightweight accounting software system built to demonstrate how a business can record accounting transactions, maintain a chart of accounts, prepare a trial balance, and summarize financial performance in a simple web application.

The application is designed around the core accounting concepts typically discussed in Module 4:
- Chart of accounts
- Journal entries
- Posting to ledger accounts
- Trial balance
- Financial summary

## Problem Statement
Businesses need a reliable way to track their financial transactions and produce meaningful summary reports. Without a proper accounting system, it is difficult to:
- record transactions consistently,
- classify them under correct accounts,
- ensure debits and credits are balanced,
- prepare a trial balance,
- calculate financial results such as revenue, expenses, and net income.

The problem is to transform raw financial transactions into accurate and usable accounting data that a business can review and act on.

## How We Solved It
We implemented a simple accounting engine that:
1. Creates a chart of accounts with common business categories such as Cash, Accounts Receivable, Assets, Liabilities, Equity, Revenue, and Expenses.
2. Accepts journal entries with a debit account, credit account, description, date, and amount.
3. Updates each account balance after posting the entry.
4. Generates a trial balance that shows total debits and credits.
5. Produces a financial summary with revenue, expenses, net income, and balance sheet totals.
6. Presents the solution in a web application so users can interact with it through a browser instead of a command-line interface.

The web app allows a user to enter transactions and instantly see the updated ledger and financial reports.

## Project Structure

```text
Projecct/
├── app.py
├── requirements.txt
├── run_app.bat
├── README.md
├── AccountingSoftware/
│   ├── __init__.py
│   ├── module4.py
│   └── test_module4.py
├── static/
│   └── style.css
└── templates/
    └── index.html
```

## Dependencies
The application uses the following dependency:

- Python 3.9+
- Flask 3.0.3

You can install the dependencies using:

```bash
pip install -r requirements.txt
```

## Installation and Setup
1. Open a terminal in the project folder.
2. Create or activate the Python virtual environment if needed.
3. Install dependencies.
4. Run the application.

### Option 1: Using the project virtual environment
```bash
cd "C:\Users\USER\Documents\Projecct"
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

### Option 2: Using a basic Python environment
```bash
cd "C:\Users\USER\Documents\Projecct"
python -m pip install -r requirements.txt
python app.py
```

## How to Run the Web App
After starting the app, open your browser and go to:

```text
http://localhost:5000
```

The page allows you to:
- add journal entries,
- view the chart of accounts,
- review the trial balance,
- inspect the financial summary,
- reset the ledger to its default state.

## Working Procedure
The working process of the system is as follows:

1. The app loads the chart of accounts.
2. The user enters a journal entry through the form.
3. The system posts the entry by increasing the debit account and credit account balances.
4. The trial balance is regenerated from the updated account balances.
5. The financial summary is recalculated using revenue, expense, asset, liability, and equity data.
6. The results are displayed to the user in the browser interface.

## Business Logic Used
The system uses a simplified accounting model:

- Assets increase on the debit side.
- Liabilities and equity increase on the credit side.
- Revenue increases credit balances.
- Expenses increase debit balances.

This follows the standard double-entry accounting principle:

```text
Debit = Credit
```

## Example Transaction
An example transaction in the system may be:

- Debit: Cash (101) – 25,000
- Credit: Owner’s Equity (301) – 25,000

This means the owner invested capital into the business.

The app records the transaction and updates both account balances accordingly.

## Verification
The project includes a test file for validation:

```bash
python -m pytest -q
```

The tests cover:
- chart of account creation,
- journal entry posting,
- trial balance generation,
- financial report generation.

## Conclusion
This project demonstrates how a simple accounting system can be built using Python and Flask. It captures the key problem of managing business transactions and solving it through software that organizes accounts, records entries, and generates useful financial information.

It is useful as a learning project, student assignment, or a simple prototype for business accounting tasks.
