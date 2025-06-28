import React from "react";
import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/hotels/countByCity?cities=Karachi,Peshawar,Lahore"
  );

  return (
    <div className="featured">
      {loading ? ("Loading please wait") : 
        (<>
          <div className="featuredItem">
            <img
              src="https://q-xx.bstatic.com/xdata/images/city/170x136/688249.jpg?k=42442ea62b97c8d6b57b4b6171b406e6778a9b160b4ce0c69f53726b397c7d3e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Karachi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://q-xx.bstatic.com/xdata/images/city/170x136/724981.jpg?k=d2a74ca55c128d783c4a6836713abe2ef7874ba2cc276b9f671df017ff24da19&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Peshawar</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://r-xx.bstatic.com/xdata/images/city/170x136/640442.jpg?k=90687d20998ee01829027c5e6396a0b8c6d9198bb76bd5ffc7c49c5b779e18ae&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Lahore</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>)
      }
    </div>
  );
};

export default Featured;
