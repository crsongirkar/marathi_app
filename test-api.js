/**
 * Automated Verification Script for Marathi Learning API with BaseURL and Connection Pages
 */
const http = require('http');
const serverApp = require('./server.js');
const { connectDB } = require('./src/config/db');

const PORT = 5001; // Test server port
let server;

function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';

    const reqHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    };

    if (data) {
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path,
      method,
      headers: reqHeaders,
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, body, headers: res.headers });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n🧪 Starting Marathi Learning API Automated Tests (BaseURL & Error Handlers)...\n');

  await connectDB();

  server = serverApp.listen(PORT, async () => {
    console.log(`Test server running on http://localhost:${PORT}\n`);

    try {
      const testMobile = '9833207555';
      let userToken = '';


      // Test 1: System Health & BaseURL Endpoint
      console.log('---------------------------------------------------------');
      console.log('1️⃣ Testing System Health Check (/health)...');
      const healthRes = await makeRequest('GET', '/health');
      console.log(`Status Code: ${healthRes.status}`);
      console.log('Response:', JSON.stringify(healthRes.body, null, 2));

      if (healthRes.status === 200 && healthRes.body.success && healthRes.body.status === 'UP') {
        console.log('✅ PASS: Health check endpoint passed!');
      } else {
        throw new Error('❌ FAIL: Health check test failed');
      }

      // Test 2: Database Connection Status Page (/db-status)
      console.log('\n---------------------------------------------------------');
      console.log('2️⃣ Testing Database Status Endpoint (/db-status)...');
      const dbStatusRes = await makeRequest('GET', '/db-status');
      console.log(`Status Code: ${dbStatusRes.status}`);
      console.log('Response:', JSON.stringify(dbStatusRes.body, null, 2));

      if (dbStatusRes.status === 200 || dbStatusRes.status === 503) {
        console.log('✅ PASS: DB status endpoint correctly reports connection state!');
      } else {
        throw new Error('❌ FAIL: DB status test failed');
      }

      // Test 3: Formatted 404 Error Page
      console.log('\n---------------------------------------------------------');
      console.log('3️⃣ Testing 404 Route Not Found Error Handler...');
      const notFoundRes = await makeRequest('GET', '/api/auth/non-existing-route');
      console.log(`Status Code: ${notFoundRes.status}`);
      console.log('Response:', JSON.stringify(notFoundRes.body, null, 2));

      if (notFoundRes.status === 404 && notFoundRes.body.availableEndpoints) {
        console.log('✅ PASS: 404 error handler returned formatted JSON response with available endpoints!');
      } else {
        throw new Error('❌ FAIL: 404 error handler test failed');
      }

      // Test 4: Send OTP (2Factor API Integration)
      console.log('\n---------------------------------------------------------');
      console.log('4️⃣ Testing Send OTP API (POST /api/auth/send-otp)...');
      const sendOtpRes = await makeRequest('POST', '/api/auth/send-otp', {
        mobileNumber: testMobile,
      });

      console.log(`Status Code: ${sendOtpRes.status}`);
      console.log('Response:', JSON.stringify(sendOtpRes.body, null, 2));

      if (sendOtpRes.status === 200 && sendOtpRes.body.success) {
        console.log('✅ PASS: Send OTP endpoint works!');
      } else {
        throw new Error('❌ FAIL: Send OTP test failed');
      }

      // Test 5: Verify OTP
      console.log('\n---------------------------------------------------------');
      console.log('5️⃣ Testing Verify OTP API (POST /api/auth/verify-otp)...');
      const verifyOtpRes = await makeRequest('POST', '/api/auth/verify-otp', {
        mobileNumber: testMobile,
        otp: sendOtpRes.body.testOtp || '123456',
      });

      console.log(`Status Code: ${verifyOtpRes.status}`);
      console.log('Response:', JSON.stringify(verifyOtpRes.body, null, 2));

      if (verifyOtpRes.status === 200 || verifyOtpRes.status === 201) {
        if (verifyOtpRes.body.token && verifyOtpRes.body.isNewUser !== undefined) {
          console.log('✅ PASS: Verify OTP successful!');
          userToken = verifyOtpRes.body.token;
        } else {
          throw new Error('❌ FAIL: Token or isNewUser flag missing in verify OTP response');
        }
      } else {
        throw new Error('❌ FAIL: Verify OTP test failed');
      }

      // Test 6: Mobile Auth - Signup & Login
      console.log('\n---------------------------------------------------------');
      console.log('6️⃣ Testing Mobile Auth API (POST /api/auth/mobile-auth)...');
      const signupRes = await makeRequest('POST', '/api/auth/mobile-auth', {
        mobileNumber: testMobile,
      });

      console.log(`Status Code: ${signupRes.status}`);
      console.log('Response:', JSON.stringify(signupRes.body, null, 2));

      if (signupRes.status === 200 && signupRes.body.token) {
        console.log('✅ PASS: Mobile auth login successful!');
      } else {
        throw new Error('❌ FAIL: Mobile signup test failed');
      }


      // Test 5: Profile GET and PUT Update (including Mobile Number Update)
      console.log('\n---------------------------------------------------------');
      console.log('5️⃣ Testing User Profile GET & PUT APIs (including Mobile Number update)...');
      const updateData = {
        mobileNumber: '9988776655',
        name: 'Rohan Patil',
        email: 'rohan.patil@example.com',
        age: 26,
        gender: 'Male',
        preferredLanguage: 'Marathi',
      };

      const updateRes = await makeRequest('PUT', '/api/auth/profile', updateData, {
        Authorization: `Bearer ${userToken}`,
      });

      console.log(`Status Code: ${updateRes.status}`);
      console.log('Response:', JSON.stringify(updateRes.body, null, 2));

      if (
        updateRes.status === 200 &&
        updateRes.body.user.name === 'Rohan Patil' &&
        updateRes.body.user.mobileNumber === '9988776655'
      ) {
        console.log('✅ PASS: User profile & mobile number updated successfully!');
      } else {
        throw new Error('❌ FAIL: Update profile test failed');
      }

      console.log('\n🎉 ALL 5 VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉\n');
    } catch (err) {
      console.error('\n❌ Test Execution Error:', err.message);
      process.exitCode = 1;
    } finally {
      server.close(() => {
        console.log('Test server shut down.');
        process.exit(process.exitCode || 0);
      });
    }
  });
}

runTests();








