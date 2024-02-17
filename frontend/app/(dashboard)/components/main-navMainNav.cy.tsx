import React from "react";
import { MainNav } from "./main-nav";

describe("<MainNav />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MainNav />);
    cy.get('nav a[href="/"]').should(
      "have.class",
      "text-sm font-medium transition-colors hover:text-primary"
    );
    cy.get('nav a[href="/teams"]').should(
      "have.class",
      "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    );
    cy.get('nav a[href="/players"]').should(
      "have.class",
      "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    );
    cy.get('nav a[href="/"]').should("have.text", "Dashboard");
    cy.get('nav a[href="/teams"]').should("have.text", "Times");
    cy.get('nav a[href="/players"]').should("have.text", "Jogadores");
  });
});
