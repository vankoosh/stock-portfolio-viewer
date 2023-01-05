export default function User({ user, setSelectedUser, setActiveUser, activeUser }) {

  return (
    <div
      id={user.clientId}
      className={
        activeUser && activeUser === user.clientId
          ? "p-2 py-4 rounded-lg w-[20vw] bg-green-800 hover:cursor-pointer mx-auto px-8 my-4 hover:bg-green-800"
          : "p-2 py-4 rounded-lg w-[20vw] bg-[#014885] hover:cursor-pointer mx-auto px-8 my-4 hover:bg-green-800"
      }
      onClick={(e) => {
        setSelectedUser(user);
        setActiveUser(e.currentTarget.id)
      }}
    >
      <h1 className="text-2xl">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-white">
        Risk Profile: <span className="ml-4">{user.riskProfile}</span>
      </p>
      <p className="text-white">
        Net Worth: <span className="ml-4">{user.aggNetWorth}</span>
      </p>

      {user.portfolios.map((portfolio) => {
        return (
          <p className="text-white" key={portfolio.portfolioId + " portNames"}>
            Portfolio Name:
            <span className="ml-4">{portfolio.portfolioName}</span>
          </p>
        );
      })}

      <p className="text-white">
        Restriction Status:
        <span
          className={
            user.aggRestrictionStatus === "breached"
              ? "ml-4 text-red-900"
              : "ml-4 text-white"
          }
        >
          {user.aggRestrictionStatus}
        </span>
      </p>
      <p className="text-white">
        Aggregated Cap. Gain:<span className="ml-4">{user.aggCapGain}</span>
      </p>
    </div>
  );
}
