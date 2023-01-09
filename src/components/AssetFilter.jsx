
export default function AssetFilter({
  selectedRadioBtn_Portfolio,
  setSelectedRadioBtn_Portfolio,
}) {
  return (
    <form
      action="/"
      className="fixed top-0 bg-[#caced3] w-auto h-12 text-black"
    >
      <input
        type="radio"
        name="sort"
        value="name"
        checked={selectedRadioBtn_Portfolio === "name" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Name
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="type"
        checked={selectedRadioBtn_Portfolio === "type" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Portfolio Type
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="location"
        checked={selectedRadioBtn_Portfolio === "location" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Location
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="quantity"
        checked={selectedRadioBtn_Portfolio === "quantity" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Quantity
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="total value"
        checked={selectedRadioBtn_Portfolio === "total value" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Total Value
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="capital gain"
        checked={selectedRadioBtn_Portfolio === "capital gain" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Capital Gain
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="risk"
        checked={selectedRadioBtn_Portfolio === "risk" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_Portfolio(e.currentTarget.value);
        }}
      />
      &nbsp;Ass. Risk
    </form>
  );
}