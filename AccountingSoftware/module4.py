"""Accounting software module for core bookkeeping and trial balance generation."""

from __future__ import annotations


def create_chart_of_accounts():
    """Create a chart of accounts for a simple business ledger."""
    return {
        "101": {"code": "101", "name": "Cash", "type": "Asset", "balance": 0.0},
        "110": {"code": "110", "name": "Accounts Receivable", "type": "Asset", "balance": 0.0},
        "120": {"code": "120", "name": "Inventory", "type": "Asset", "balance": 0.0},
        "161": {"code": "161", "name": "Office Equipment", "type": "Asset", "balance": 0.0},
        "201": {"code": "201", "name": "Accounts Payable", "type": "Liability", "balance": 0.0},
        "301": {"code": "301", "name": "Owner's Equity", "type": "Equity", "balance": 0.0},
        "401": {"code": "401", "name": "Sales Revenue", "type": "Revenue", "balance": 0.0},
        "501": {"code": "501", "name": "Rent Expense", "type": "Expense", "balance": 0.0},
        "502": {"code": "502", "name": "Utilities Expense", "type": "Expense", "balance": 0.0},
        "503": {"code": "503", "name": "Salaries Expense", "type": "Expense", "balance": 0.0},
    }


def post_journal_entry(accounts, entry):
    """Record a journal entry and update balances in the ledger accounts."""
    debit_account = entry["debit_account"]
    credit_account = entry["credit_account"]
    amount = float(entry["amount"])

    accounts[debit_account]["balance"] += amount
    accounts[credit_account]["balance"] += amount

    return accounts


def generate_trial_balance(accounts):
    """Return a simple trial balance summary from the chart of accounts."""
    balances = {}
    total_debit = 0.0
    total_credit = 0.0

    for code, account in accounts.items():
        balance = float(account["balance"])
        debit = balance if balance > 0 else 0.0
        credit = abs(balance) if balance < 0 else 0.0
        balances[code] = {"name": account["name"], "debit": debit, "credit": credit}
        total_debit += debit
        total_credit += credit

    return {"balances": balances, "total_debit": total_debit, "total_credit": total_credit}


def generate_financial_reports(accounts):
    """Build a minimal income statement and balance sheet summary."""
    total_assets = 0.0
    total_liabilities = 0.0
    total_equity = 0.0
    revenue = 0.0
    expenses = 0.0

    for account in accounts.values():
        balance = float(account["balance"])
        if account["type"] == "Asset":
            total_assets += balance
        elif account["type"] == "Liability":
            total_liabilities += balance
        elif account["type"] == "Equity":
            total_equity += balance
        elif account["type"] == "Revenue":
            revenue += balance
        elif account["type"] == "Expense":
            expenses += balance

    net_income = revenue - expenses
    return {
        "revenue": revenue,
        "expenses": expenses,
        "net_income": net_income,
        "total_assets": total_assets,
        "total_liabilities": total_liabilities,
        "equity": total_equity + net_income,
    }


def main():
    """Simple demo for the module."""
    accounts = create_chart_of_accounts()
    accounts = post_journal_entry(accounts, {
        "date": "2026-08-01",
        "description": "Initial owner investment",
        "debit_account": "101",
        "credit_account": "301",
        "amount": 25000,
    })
    print(generate_trial_balance(accounts))
    print(generate_financial_reports(accounts))


if __name__ == "__main__":
    main()
