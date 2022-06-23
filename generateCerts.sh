#!/usr/bin/env bash

pushd ./ssl > /dev/null
mkcert -cert-file patient-dashboard-cert.pem -key-file patient-dashboard-key.pem localhost 127.0.0.1 ::1
popd > /dev/null
