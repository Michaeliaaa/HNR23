import React from "react";
import type { IHighlight } from "@darian-lp/react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  removeHighlight: (id: string) => void;
  setSearchValue: (searchValue: string) => void;
  currentMatch: number;
  totalMatchCount: number;
  findNext: () => void;
  findPrev: () => void;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  resetHighlights,
  removeHighlight,
  setSearchValue,
  currentMatch,
  totalMatchCount,
  findNext,
  findPrev,
}: Props) {
  return (
    <div className="sidebar" style={{ width: "75vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Notes</h2>
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag. To delete a specific highlight, click the X.
          </small>
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img style={{maxHeight: "24px", maxWidth: "24px"}} src="https://img.icons8.com/ios/24/ffffff/search" alt="search"/>
          <input type="text" style={{ marginLeft: "20px", marginRight: "20px", height: "30px", }} onChange={(e) => setSearchValue(e.target.value)} />
          <div>
            {totalMatchCount > 0 ? (
              <div style={{
                display: "flex",
                flexDirection: "row",
              }}>
                <button style={{
                  color: "white",
                  width: "40px",
                  height: "30px",
                  backgroundColor: "grey",
                  borderStartStartRadius: "20px",
                  borderEndStartRadius: "20px",
                }} onClick={findPrev}>{"<"}
                </button>
                <div style={{
                  backgroundColor: "grey",
                  height: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}>
                  {`${currentMatch}/${totalMatchCount}`}
                </div>
                <button style={{
                  color: "white",
                  width: "40px",
                  height: "30px",
                  backgroundColor: "grey",
                  borderEndEndRadius: "20px",
                  borderStartEndRadius: "20px",
                }} onClick={findNext}>{">"}</button>
              </div>
            ): null}
          </div>
        </div>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong style={{color: "white"}}>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
            <div className="highlight__remove">
              <button>
                <img 
                  src="https://img.icons8.com/ios/24/ffffff/delete-sign.png"
                  alt="Remove"
                  onClick={() => {
                    removeHighlight(highlight.id);
                  }}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div>
          <div style={{
            padding: "1rem",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <button style={{ color: "white", fontWeight: "bold" }} onClick={resetHighlights}>Remove All Annotations</button>
            <a
              style={{ color: "white", fontWeight: "bold" }}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(highlights)
              )}`}
              download="notes.json">Export Annotations</a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
