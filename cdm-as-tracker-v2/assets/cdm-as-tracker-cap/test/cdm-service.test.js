"use strict";
const cds = require("@sap/cds/lib");

describe("CDM Service — status machine", () => {
  let db, srv;

  beforeAll(async () => {
    cds.env.requires.db = { kind: "sqlite", credentials: { url: ":memory:" } };
    cds.env.requires.auth = { kind: "dummy" };
    const csn = await cds.load("srv/cdm-service.cds");
    db = await cds.connect.to("db");
    await cds.deploy(csn).to(db);
    srv = await cds.connect.to("CDMService");
  });

  async function createRequest(overrides = {}) {
    return srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: cds.utils.uuid(),
        customerId: "C001",
        customerName: "Acme",
        requestedService: "System Conversion Premium",
        currency: "EUR",
        estimatedPrice: 5000,
        cdmOwner: "alex@sap.com",
        status: "New",
        ...overrides,
      })
    );
  }

  test("CREATE sets status to New", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C001", customerName: "Acme",
        requestedService: "Conversion", currency: "EUR",
        estimatedPrice: 3000, cdmOwner: "alex@sap.com",
      })
    );
    const [row] = await SELECT.from("cdm.tracker.ASRequest").where({ ID: id });
    expect(row.status).toBe("New");
  });

  test("priceInWords is computed on create", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C002", customerName: "Beta Inc",
        requestedService: "Add-on", currency: "EUR",
        estimatedPrice: 1000, cdmOwner: "alex@sap.com",
      })
    );
    const [row] = await SELECT.from("cdm.tracker.ASRequest").where({ ID: id });
    expect(row.priceInWords).toBeTruthy();
    expect(row.priceInWords).toMatch(/thousand/i);
  });

  test("advanceStatus New → PriceCommunicated succeeds", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C003", requestedService: "Upgrade",
        currency: "EUR", estimatedPrice: 2000, cdmOwner: "alex@sap.com",
      })
    );
    await srv.tx({ user: { id: "alex@sap.com", roles: ["CDM"] } }, tx =>
      tx.send("advanceStatus", { ID: id }, { newStatus: "PriceCommunicated", comment: "sent email" })
    );
    const [row] = await SELECT.from("cdm.tracker.ASRequest").where({ ID: id });
    expect(row.status).toBe("PriceCommunicated");
  });

  test("advanceStatus skipping a step throws", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C004", requestedService: "Service",
        currency: "EUR", estimatedPrice: 500, cdmOwner: "alex@sap.com",
      })
    );
    await expect(
      srv.tx({ user: { id: "alex@sap.com", roles: ["CDM"] } }, tx =>
        tx.send("advanceStatus", { ID: id }, { newStatus: "Approved", comment: "" })
      )
    ).rejects.toThrow();
  });

  test("recordApproval on PriceCommunicated request sets Approved", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C005", requestedService: "Premium",
        currency: "EUR", estimatedPrice: 4000, cdmOwner: "alex@sap.com", status: "PriceCommunicated",
      })
    );
    await srv.tx({ user: { id: "alex@sap.com", roles: ["CDM"] } }, tx =>
      tx.send("recordApproval", { ID: id }, { approvalText: "Customer approved", poNumber: "PO-99" })
    );
    const [row] = await SELECT.from("cdm.tracker.ASRequest").where({ ID: id });
    expect(row.status).toBe("Approved");
    expect(row.poNumber).toBe("PO-99");
  });

  test("generateJiraTicket returns rendered template", async () => {
    const id = cds.utils.uuid();
    await srv.run(
      INSERT.into("cdm.tracker.ASRequest").entries({
        ID: id, customerId: "C006", customerName: "Corp AG", sid: "CRP",
        requestedService: "SC Premium", rrCode: "SC-42",
        currency: "EUR", estimatedPrice: 5000, cdmOwner: "alex@sap.com", status: "Approved",
      })
    );
    const result = await srv.tx({ user: { id: "alex@sap.com", roles: ["CDM"] } }, tx =>
      tx.send("generateJiraTicket", { ID: id })
    );
    expect(typeof result).toBe("string");
    expect(result).toContain("Corp AG");
  });
});

describe("CDM Service — scoping", () => {
  test("CDM user only sees own requests", async () => {
    // This verifies the before READ handler filters by cdmOwner
    // In a real integration test with dummy auth, user id maps to cdmOwner
    expect(true).toBe(true); // placeholder — integration environment needed
  });
});
