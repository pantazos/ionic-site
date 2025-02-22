import { Component, Element, Prop, h, State, Host } from '@stencil/core';

@Component({
  tag: 'hubspot-dynamic-content',
  styleUrl: 'hubspot-dynamic-content.scss',
  shadow: false
})
export class HubspotDynamicContent {

  @Prop() listId: string = 'default';
  @State() isInList = false;
  @Element() el;

  API_URL = 'https://ionic-site-new.now.sh/api/hubspot/hasconverted';

  async componentWillLoad() {
    const hsutk = window['getCookie']('hubspotutk');

    fetch(`${this.API_URL}?listId=${this.listId}&hsutk=${hsutk}`)
      .then(response => response.json())
      .then( data => {
        this.isInList = data.found;
      })
      .catch(e => {
        console.warn(e);
      })
      .finally( () => {
        this.el.classList.add('ready');
      });
  }

  render() {
    // console.log('rendering', this.isInList);
    return (
      <Host>
        {this.isInList ? 
          <slot name="default" /> : 
          <slot name="alternate" />
        }
      </Host>
    );
  }
}
