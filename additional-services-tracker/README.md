# CDM Additional Services Tracker

Internal tool for SAP CDMs to track chargeable Additional Services requests.

## Run locally

    npm install
    cds watch

## Setup

Copy `.env.example` to `.env` and set your `ANTHROPIC_API_KEY`.

## Data

Dev runs with SQLite in-memory + synthetic seed data only.
Real customer data requires SAP Gen AI Hub (Phase 2 — AI Core entitlement needed).
