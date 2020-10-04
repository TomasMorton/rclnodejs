// Copyright (c) 2020 Intel Corporation. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/* eslint-disable camelcase */

const rclnodejs = require('../index.js');

rclnodejs
  .init()
  .then(() => {
    const node = rclnodejs.createNode('publisher_message_example_node');

    // We have to make sure the message type of publisher and subscription is
    // the same, although it seems meaningless when sending raw messages.
    const publisher = node.createPublisher(
      'test_msgs/msg/BasicTypes',
      'chatter'
    );
    let count = 0;

    setInterval(function () {
      publisher.publish(Buffer.from('Hello ROS World'));
      console.log(`Publish ${++count} messages.`);
    }, 1000);

    rclnodejs.spin(node);
  })
  .catch((e) => {
    console.log(e);
  });