import React, { useEffect } from "react";
import "./app.css";
import AppBuilderReactSdk from "@appbuilder/react";

function App() {
  useEffect(() => {
    const myCustomization = AppBuilderReactSdk.createCustomization({
      // components:{
      //     videocall: () => <div>Hi</div>
      //   }
    });

    AppBuilderReactSdk.customize(myCustomization);

    const unsubCreateEvent = AppBuilderReactSdk.on(
      "create",
      (hostMeetingId, attendeeMeetingId, pstnNumber) => {
        console.log("React Host App: Meeting created with", {
          hostMeetingId,
          attendeeMeetingId,
          pstnNumber,
        });
      }
    );
    const unsubReadyToJoinEvent = AppBuilderReactSdk.on(
      "ready-to-join",
      (meetingTitle, deviceList) => {
        console.log("React Host App: precall with", {
          meetingTitle,
          deviceList,
        });
      }
    );
    const unsubJoinEvent = AppBuilderReactSdk.on(
      "join",
      (meetingTitle, deviceList, isHost) => {
        console.log("React Host App: joined with", {
          meetingTitle,
          deviceList,
          isHost,
        });
      }
    );
    const unsubLeaveEvent = AppBuilderReactSdk.on("leave", () => {
      console.log("React Host App: left");
    });
    return () => {
      unsubCreateEvent();
      unsubReadyToJoinEvent();
      unsubJoinEvent();
      unsubLeaveEvent();
    };
  }, []);

  const joinMeeting = () => {
    AppBuilderReactSdk.join(document.getElementById("meetingId").value);
  };

  return (
    <div className="App">
      <div className="header">
        <span>My React App</span>
        <input id="meetingId" type="text" placeholder="Room id"></input>
        <button onClick={joinMeeting}>Join</button>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <AppBuilderReactSdk.View />
      </div>
    </div>
  );
}

export default App;
