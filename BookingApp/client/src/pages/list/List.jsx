import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch"

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const[min, setMin] = useState(undefined)
  const[max, setMax] = useState(undefined)

  const { data, loading, error, reFetch} = useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  // console.log(data)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span
                onClick={() => {
                  setOpenDate((prev) => !prev);
                }}
              >{`${format(dates[0].startDate, "MM/dd//yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd//yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className="lsItem">
              <label htmlFor="Options">Options</label>
              <div className="lsOptions">

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price <small> per night</small>
                </span>
                <input type="number" onChange={(e) => setMin(Number(e.target.value))} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price <small> per night</small>
                </span>
                <input type="number" className="lsOptionInput" onChange={(e) => setMax(Number(e.target.value))} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adult
                </span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.adult}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children
                </span>
                <input type="number" className="lsOptionInput" min={0} placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.room} />
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading Please wait" : <>
            {data.map(item => (
            <SearchItem item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
