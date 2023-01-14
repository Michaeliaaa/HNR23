import React, { Component } from 'react';
import PageOrder from './PageOrder';

type PageOrderUploaderState = {
  orders: String[] | null;
  selected: boolean;
}

class JSONFileUploader extends Component<{}, PageOrderUploaderState> {
  state = {
    orders: null,
    selected: false,
  }

  handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.setState({ selected: true });
        const result = JSON.parse(event.target.result);
        console.log(result);
        this.setState({ orders: result });
      };
      reader.readAsText(file);
    }
  }

  render() {
    const { orders, selected } = this.state;
    return (
      selected ? (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '20px',
          marginLeft: '20px',
        }}>
          {selected && orders && <PageOrder input={orders} />}
        </div>
      ): (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '20px',
          marginLeft: '20px',
        }}>
          <small style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '10px' }}>Import Annotations:</small>
          <input style={{ marginLeft: '10px', marginBottom: '50px' }} type="file" accept=".json" onChange={this.handleFileSelect} />
          {<PageOrder input={null} />}
        </div>
      )
    );
  }
}

export default JSONFileUploader;
