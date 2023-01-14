import React, { Component } from "react";

import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "@darian-lp/react-pdf-highlighter";

import type { IHighlight, NewHighlight } from "@darian-lp/react-pdf-highlighter"

import { testHighlights as _testHighlights } from "../test-highlights";
import { Spinner } from "./Spinner";
import { Sidebar } from "./Sidebar";

import "../style/Highlighter.css";

const testHighlights: Array<IHighlight> = _testHighlights;

interface Props {
  input: Array<IHighlight> | null;
}

interface State {
  pagesRotation: number;
  url: string;
  scaleValue: string;
  highlights: Array<IHighlight>;
  currentMatch: number;
  totalMatchCount: number;
  searchValue: string;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const URL = "https://storage.googleapis.com/the-option-363019.appspot.com/cains%20jawbone.pdf";

export class Highlighter extends Component<Props, State> {
  state = {
    searchValue: "",
    pagesRotation: 0,
    url: URL,
    highlights: this.props.input
      ? [...this.props.input]
      : [...testHighlights],
    scaleValue: "page-width",
    currentMatch: 0,
    totalMatchCount: 0,
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  removeHighlight = (id: string) => {
    this.setState({
      highlights: this.state.highlights.filter((h) => h.id !== id),
    });
  };

  scrollViewerTo = (highlight: any) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight: NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    });
  }

  findNext = () => {};

  findPrev = () => {};

  render() {
    const {
      url,
      highlights,
      scaleValue,
      searchValue,
      currentMatch,
      totalMatchCount,
      pagesRotation,
    } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh", width: '100%' }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          removeHighlight={this.removeHighlight}
          setSearchValue={(searchValue: any) => this.setState({ searchValue })}
          currentMatch={currentMatch}
          totalMatchCount={totalMatchCount}
          findNext={this.findNext}
          findPrev={this.findPrev}
        />
        <div
          style={{
            height: "100vh",
            width: "75vw",
            position: "relative",
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pagesRotation={pagesRotation}
                searchValue={searchValue}
                onSearch={(currentMatch, totalMatchCount) => {
                  this.setState({ currentMatch, totalMatchCount });
                }}
                findRefs={(findPrev, findNext) => {
                  this.findPrev = findPrev;
                  this.findNext = findNext;
                }}
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                pdfScaleValue={scaleValue}
                scrollRef={(scrollTo) => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      this.addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
      </div>
    );
  }
}
