import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/horizontal-layout';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-closing')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        aria-label="System maintenance notice"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout>
                <h2>System maintenance</h2>
                <p>
                  System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We
                  apologise for any inconvenience.
                </p>
                <vaadin-button @click="${() => (this.dialogOpened = false)}">Close</vaadin-button>
              </vaadin-vertical-layout>
              <style>
                vaadin-vertical-layout {
                  align-items: stretch;
                  width: 18rem;
                  max-width: 100%;
                }
                h2 {
                  margin-top: 0;
                }
                vaadin-button {
                  align-self: flex-end;
                }
              </style>
            `,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[] -->

      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
