<template>
  <div class="App">
    <div class="header">
      <span>My Vue App</span>
      <input id="meetingId" type="text" placeholder="Room id" />
      <button @click="JoinMeeting()">Join</button>
    </div>
    <div style="display: flex; flex: 1">
      <app-builder> </app-builder>
    </div>
  </div>
</template>

<script>
import "./app.css";
import AppBuilderWebSdk from "@appbuilder/web";
// eslint-disable-next-line
import React from "react";
// To prevent react getting removed in dead code elimination step;
React.createElement("div");

let unsubCreateEvent = () => {};
let unsubReadyToJoinEvent = () => {};
let unsubJoinEvent = () => {};
let unsubLeaveEvent = () => {};

const myCustomization = AppBuilderWebSdk.createCustomization({
  // components:{
  //     videocall: () => <div>Hi</div>
  //   }
});
AppBuilderWebSdk.customize(myCustomization);

export default {
  name: "App",
  methods: {
    JoinMeeting() {
      AppBuilderWebSdk.join(document.getElementById("meetingId").value);
    },
  },
  mounted() {
    unsubCreateEvent = AppBuilderWebSdk.on(
      "create",
      (hostMeetingId, attendeeMeetingId, pstnNumber) => {
        console.log("Vue Host App: Meeting created with", {
          hostMeetingId,
          attendeeMeetingId,
          pstnNumber,
        });
      }
    );
    unsubReadyToJoinEvent = AppBuilderWebSdk.on(
      "ready-to-join",
      (meetingTitle, deviceList) => {
        console.log("Vue Host App: precall with", {
          meetingTitle,
          deviceList,
        });
      }
    );
    unsubJoinEvent = AppBuilderWebSdk.on(
      "join",
      (meetingTitle, deviceList, isHost) => {
        console.log("Vue Host App: Meeting joined with", {
          meetingTitle,
          deviceList,
          isHost,
        });
      }
    );
    unsubLeaveEvent = AppBuilderWebSdk.on("leave", () => {
      console.log("Vue Host App: Meeting left");
    });
  },
  unmounted() {
    unsubCreateEvent();
    unsubReadyToJoinEvent();
    unsubJoinEvent();
    unsubLeaveEvent();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
