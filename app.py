from flask import Flask, render_template, request, redirect, url_for

from AccountingSoftware.module4 import (
    create_chart_of_accounts,
    post_journal_entry,
    generate_trial_balance,
    generate_financial_reports,
)

app = Flask(__name__)


def initialize_state():
    return create_chart_of_accounts()


@app.route("/", methods=["GET", "POST"])
def index():
    accounts = app.config.get("accounts")
    if accounts is None:
        accounts = initialize_state()
        app.config["accounts"] = accounts

    if request.method == "POST":
        entry = {
            "date": request.form.get("date") or "2026-08-01",
            "description": request.form.get("description") or "Manual entry",
            "debit_account": request.form.get("debit_account"),
            "credit_account": request.form.get("credit_account"),
            "amount": float(request.form.get("amount") or 0),
        }
        if entry["debit_account"] and entry["credit_account"] and entry["amount"] > 0:
            accounts = post_journal_entry(accounts, entry)
            app.config["accounts"] = accounts
        return redirect(url_for("index"))

    trial_balance = generate_trial_balance(accounts)
    financial_report = generate_financial_reports(accounts)
    return render_template(
        "index.html",
        accounts=accounts,
        trial_balance=trial_balance,
        financial_report=financial_report,
    )


@app.route("/reset")
def reset_accounts():
    app.config["accounts"] = initialize_state()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.config["accounts"] = initialize_state()
    app.run(debug=True, host="0.0.0.0", port=5000)
