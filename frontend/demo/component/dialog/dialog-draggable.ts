import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/horizontal-layout';
import '@vaadin/text-area';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-draggable')
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
        aria-label="Add note"
        theme="no-padding"
        draggable
        modeless
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <div class="header draggable">
                <h2>Add note</h2>
              </div>
              <vaadin-vertical-layout theme="spacing padding">
                <vaadin-text-field label="Title"></vaadin-text-field>
                <vaadin-text-area label="Description"></vaadin-text-area>
                <vaadin-horizontal-layout theme="spacing">
                  <vaadin-button @click="${() => (this.dialogOpened = false)}">
                    Cancel
                  </vaadin-button>
                  <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
                    Add note
                  </vaadin-button>
                </vaadin-horizontal-layout>
              </vaadin-vertical-layout>
              <style>
                vaadin-vertical-layout {
                  align-items: stretch;
                  width: 18rem;
                  max-width: 100%;
                }
                .header {
                  cursor: move;
                  border-bottom: 1px solid var(--lumo-contrast-20pct);
                  padding: var(--lumo-space-m) var(--lumo-space-l);
                }
                h2 {
                  margin: 0;
                }
                vaadin-horizontal-layout {
                  justify-content: flex-end;
                  margin-top: var(--lumo-space-m);
                }
              </style>
            `,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
