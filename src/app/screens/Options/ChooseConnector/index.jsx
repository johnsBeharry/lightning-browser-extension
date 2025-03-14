import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import LinkButton from "../../../components/LinkButton";

import ConnectLnd from "../../Onboard/ConnectLnd";
import ConnectLndHub from "../../Onboard/ConnectLndHub";
import ConnectLnbits from "../../Onboard/ConnectLnbits";
import NewWallet from "../../Onboard/NewWallet";

export default function ChooseConnector() {
  let { path, url } = useRouteMatch();
  const connectors = [
    {
      to: `${url}/lnd`,
      title: "LND",
      description: "Connect to your LND node",
    },
    {
      to: `${url}/lnd-hub`,
      title: "LNDHub (Bluewallet)",
      description: "Connect to your Bluewallet mobile wallet",
    },
    {
      to: `${url}/lnbits`,
      title: "LNbits",
      description: "Connect to your LNbits account",
    },
    {
      to: `${url}/create-wallet`,
      title: "Create a new wallet",
      description: "We create and manage a lightning wallet for you",
    },
  ];

  return (
    <Switch>
      <Route exact path={path}>
        <div className="relative mt-24 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative">
            <h1 className="text-3xl font-bold">Add a new lightning account</h1>
            <p className="text-gray-500 my-6"></p>
            <div className="space-y-4">
              {connectors.map(({ to, title, description }) => (
                <LinkButton to={to} title={title} description={description} />
              ))}
            </div>
          </div>
        </div>
      </Route>
      <Route path={`${path}/lnd`}>
        <ConnectLnd />
      </Route>
      <Route path={`${path}/lnd-hub`}>
        <ConnectLndHub />
      </Route>
      <Route path={`${path}/lnbits`}>
        <ConnectLnbits />
      </Route>
      <Route path={`${path}/create-wallet`}>
        <NewWallet />
      </Route>
    </Switch>
  );
}
