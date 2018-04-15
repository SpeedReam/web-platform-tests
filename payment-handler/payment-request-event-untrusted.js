let sender = null;

self.addEventListener('message', e => {
  if (e.data == 'start' && !sender) {
    sender = e.source;
    self.dispatchEvent(new PaymentRequestEvent('paymentrequest', {
      methodData: [{
        supportedMethods: 'basic-card'
      }],
      total: {
        currency: 'USD',
        value: '100'
      },
      modifiers: [{
        supportedMethods: 'basic-card'
      }]
    }));
  }
});

self.addEventListener('paymentrequest', async e => {
  const result = [];

  try {
    e.respondWith({});
  } catch (exception) {
    result.push(exception.name);
  }

  try {
    await e.openWindow('payment-app/payment.html');
  } catch (exception) {
    result.push(exception.name);
  }

  sender.postMessage(result);
});
