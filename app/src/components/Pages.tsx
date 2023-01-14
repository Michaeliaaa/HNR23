import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from "react-on-screen";
import cains_jawbone_pdf from "../assets/file/cains jawbone.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import React, { Component } from "react";
import HighlighterUploader from "./HighlighterUploader";
import PageOrderUploader from "./PageOrderUploader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class Pages extends Component {

  state = { numPages: null, pageNumber: 103, pageNumberCompare: 101, searchPage: null, note: ''};

	onDocumentLoadSuccess = ({ numPages } : {numPages : number}) => {
		this.setState({ numPages });
  };

  handleChange = (event: { target: { value: string; }; }) => {
    if (this.state.numPages != null) {
      if (parseInt(event.target.value) >= 1 && event.target.value <= this.state.numPages) {
        this.setState({ pageNumber: parseInt(event.target.value) });
      }
    }
  }

  handleChangeCompare = (event: { target: { value: string; }; }) => {
    if (this.state.numPages != null) {
      if (parseInt(event.target.value) >= 1 && event.target.value <= this.state.numPages) {
        this.setState({ pageNumberCompare: parseInt(event.target.value) });
      }
    }
  }

  handleNoteChange = (event: { target: { value: any; }; }) => {
    this.setState({ note: event.target.value });
  }

  goToPrevPage = () => {
    if (this.state.pageNumber > 1 && this.state.pageNumber != null) {
      this.setState((state) => ({ pageNumber: this.state.pageNumber - 1 }));
    }
  }

  goToNextPage = () => {
    if (this.state.numPages != null && this.state.pageNumber < this.state.numPages) {
      this.setState((state) => ({ pageNumber: this.state.pageNumber + 1 }));
    }
  }
  
  goToPrevPageCompare = () => {
    if (this.state.pageNumberCompare > 1 && this.state.pageNumberCompare != null) {
      this.setState((state) => ({ pageNumberCompare: this.state.pageNumberCompare - 1 }));
    }
  }
  
  goToNextPageCompare = () => {
    if (this.state.numPages != null) {
      if (this.state.pageNumberCompare < this.state.numPages) {
        this.setState((state) => ({ pageNumberCompare: this.state.pageNumberCompare + 1 }));
      }
    }
  }

	render() {
    const { pageNumber, numPages, pageNumberCompare } = this.state;

    return (
      <div>
        <section className="book" id="book">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>E-book Reader</h2>
                <p>Tip: Use the tabs to view and compare different pages!</p>
                <Tab.Container id="books-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Compare Pages</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Highlighter</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Page Ordering</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 'auto',
                        }}>
                          <div style={{marginTop: '10px'}}>
                            Page {pageNumber} of {numPages}
                          </div>
                          <nav style={
                            {
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '10px',
                              color: 'white',
                            }
                          }>
                            <form style={{ marginRight: '10px'}}>
                              <label>
                                Jump to page:
                                <input type="text" name="pg" onChange={this.handleChange}/>
                              </label>
                            </form>
                            <button
                              style={{ marginRight: '10px', color: 'white' }} onClick={this.goToPrevPage}>
                              Prev Page
                            </button>
                            <button onClick={this.goToNextPage} style={{ color: 'white' }}>
                              Next Page
                            </button>
                          </nav>

                          <div style={{ width: 500 }}>
                            <Document file={cains_jawbone_pdf} onLoadSuccess={this.onDocumentLoadSuccess}>
                              <Page pageNumber={pageNumber} width={500} renderTextLayer={true} renderAnnotationLayer={false}/>
                            </Document>
                          </div>
                        </div>
                              
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 'auto',
                        }}>
                          <div style={{marginTop: '10px'}}>
                            Page {pageNumberCompare} of {numPages}
                          </div>
                              
                          <nav style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '10px',
                            marginBottom: '10px',
                          }}>
                            <form style={{ marginRight: '10px'}}>
                              <label>
                                Jump to page:
                                <input type="text" name="pg" onChange={this.handleChangeCompare}/>
                              </label>
                            </form>
                            <button style={{ marginRight: '10px', color: 'white' }} onClick={this.goToPrevPageCompare}>
                              Prev Page
                            </button>
                            <button style={{ marginRight: '10px', color: 'white' }} onClick={this.goToNextPageCompare}>
                              Next Page
                            </button>
                          </nav>

                          <div style={{ width: 500 }}>
                            <Document file={cains_jawbone_pdf}>
                              <Page pageNumber={pageNumberCompare} width={500} renderTextLayer={true} renderAnnotationLayer={false} />
                            </Document>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div>
                        <HighlighterUploader/>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <PageOrderUploader/>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt=""></img>
      </section>
      </div>
    );
  }
}
