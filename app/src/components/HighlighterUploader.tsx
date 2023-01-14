import React, { Component } from 'react';
import { IHighlight } from '@darian-lp/react-pdf-highlighter';
import { Highlighter } from './Highlighter';

type HighlighterUploaderState = {
  annotations: IHighlight[] | null;
  selected: boolean;
}

class HighlighterUploader extends Component<{}, HighlighterUploaderState> {
  state = {
    annotations: null,
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
        this.setState({ annotations: result });
      };
      reader.readAsText(file);
    }
  }

  render() {
    const { annotations, selected } = this.state;
    return (
      selected ? (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '20px',
          marginLeft: '20px',
        }}>
          {selected && annotations && <Highlighter input={annotations} />}
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
          {<Highlighter input={null} />}
        </div>
      )
    );
  }
}

export default HighlighterUploader;
