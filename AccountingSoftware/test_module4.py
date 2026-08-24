from AccountingSoftware.module4 import (
    create_chart_of_accounts,
    post_journal_entry,
    generate_trial_balance,
    generate_financial_reports,
)


def test_chart_of_accounts_contains_core_accounts():
    accounts = create_chart_of_accounts()
    assert "101" in accounts
    assert "201" in accounts
    assert "401" in accounts
    assert accounts["101"]["name"] == "Cash"


def test_post_journal_entry_updates_ledger_balances():
    accounts = create_chart_of_accounts()
    entry = {
        "date": "2026-08-01",
        "description": "Initial capital contribution",
        "debit_account": "101",
        "credit_account": "301",
        "amount": 25000,
    }

    updated_accounts = post_journal_entry(accounts, entry)

    assert updated_accounts["101"]["balance"] == 25000
    assert updated_accounts["301"]["balance"] == 25000


def test_generate_trial_balance_matches_transaction_totals():
    accounts = create_chart_of_accounts()
    entries = [
        {"date": "2026-08-01", "description": "Owner invested capital", "debit_account": "101", "credit_account": "301", "amount": 20000},
        {"date": "2026-08-02", "description": "Purchased office furniture", "debit_account": "161", "credit_account": "101", "amount": 8000},
        {"date": "2026-08-03", "description": "Sold goods on credit", "debit_account": "110", "credit_account": "401", "amount": 5000},
    ]

    for item in entries:
        accounts = post_journal_entry(accounts, item)

    trial_balance = generate_trial_balance(accounts)

    assert trial_balance["total_debit"] == trial_balance["total_credit"]
    assert trial_balance["balances"]["101"]["debit"] == 12000
    assert trial_balance["balances"]["301"]["credit"] == 20000


def test_generate_financial_reports_returns_summary():
    accounts = create_chart_of_accounts()
    entries = [
        {"date": "2026-08-01", "description": "Owner invested capital", "debit_account": "101", "credit_account": "301", "amount": 30000},
        {"date": "2026-08-02", "description": "Cash sales", "debit_account": "101", "credit_account": "401", "amount": 7000},
        {"date": "2026-08-03", "description": "Paid rent", "debit_account": "501", "credit_account": "101", "amount": 1500},
    ]

    for item in entries:
        accounts = post_journal_entry(accounts, item)

    reports = generate_financial_reports(accounts)

    assert reports["net_income"] == 5500
    assert reports["total_assets"] > 0
    assert reports["equity"] > 0
