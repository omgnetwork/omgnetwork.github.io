---
id: api
title: API References
sidebar_label: API References
---

The OMG Network API documentation describes how you can explore and interact with the OMG Network APIs. This documentation should help you become familiar with the available resources and how to consume them with HTTP requests.

## Authentication
OMG Network APIs are completely open. No authentication is required to query and get data

## Rate Limits
API requests may be rate limited. These limits are to ensure good performance as we bring on public load. We will be constantly evaluating any rate limits we put in place as we learn more about how the system behaves.

If you exhaust the number of requests, you'll receive `HTTP/1.1 429 Too Many Requests` response with the following body:
```
{
   "data":{
      "code":"rate-limit-exceeded",
      "description":"Rate limit exceeded",
      "object":"error"
   },
   "service_name":"watcher",
   "success":false
}
```

## Documentation
- [Watcher Informational API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs)

- [Watcher Security Critical API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Fsecurity_critical_api_specs)

- [Child Chain API](https://docs.omg.network/elixir-omg/docs-ui)

## OMG Network APIs

### Watcher 
It's recommended to run your own Watcher. This means you are not bound by a requirement to place complete trust in the network operator (in this case, OMG Network). OMG Network provides the following Watcher APIs you can work with:

* [`Watcher’s Informational API`](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs) — API for common interactions, such as balance query or making transactions. 
* [`Watcher Security-Critical API`](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Fsecurity_critical_api_specs) — Plasma exit operations API.

### Child chain 
[`Child chain API`](https://docs.omg.network/elixir-omg/docs-ui) represents a public and open Plasma operator API that allows you to get block data for implementing your Watcher. 

To use the child chain you'll need to deposit funds from Ethereum into the OMG Network. Funds on the network are protected by your private key, which is the authorization mechanism used to sign Ethereum and Plasma transactions.

When sending properly signed transactions, you authorize yourself as a valid owner of the funds. Additionally, Plasma guarantees the safety of your funds against dishonest attempts by other users or the operator. A Plasma operator API that allows you to get block data for implementing your Watcher.

<!-- Review comment was: Authentication: I can see no point to list ch-ch endpoints in the table. Also, this is safer to submit txs through a Watcher -->
<!-- | Endpoint  | Description   |
| ---       |   ---         |
| transaction.submit    | Submits a signed transaction to the child chain. |
| block.get | Retrieves a specific block from the child chain by its hash, which was published on the root chain. | -->


## JSON Schema
All resources support JSON Schema. Responses are in JSON format. View the API documentation to view the details of a resource. For the child chain server and Watcher, all calls use `HTTP POST` and pass options in the request body in JSON format. 

### Errors

Errors usually return with HTTP response code 200, even if the result is an error, with error details in the response body. One exception to this is if an internal server error occurs - in this case, it will return 500

When an error occurs, success is set to false, and data will contain more information about the error.

```
{
  "version": "1",
  "success": false,
  "data": {
    "code": "account:not_found",
    "description": "Account not found"
  }
}
```

### Error Codes

| Code  | Description   |
| ---   | ---   |
| server:internal_server_error  | Something went wrong on the server. You'll need to try again. |
| operation:bad_request | Parameters required by this operation are missing or incorrect. More information about the error in response object data/messages property. |
| operation:not_found   | Operation cannot be found. Check the request URL. |
| challenge:exit_not_found  | The challenge of a particular exit is impossible because the exit is inactive or missing |
| challenge:utxo_not_spent  | The challenge of a particular exit is impossible because provided UTXO is not spent |
| exit:invalid  | UTXO was spent or does not exist. |
| get_status:econnrefused   | Cannot connect to the Ethereum node. |
| in_flight_exit:tx_for_input_not_found | No transaction that created input. |
| transaction:not_found | Transaction doesn't exist for provided search criteria. |
| transaction.create:insufficient_funds | Account balance is too low to satisfy the payment. |
| transaction.create:too_many_outputs   | Total number of payments + change + fees exceed the maximum allowed outputs in a transaction. We need to reserve one output per payment and one output per change for each currency used in the transaction. |
| transaction.create:empty_transaction  | Requested payment resulted in an empty transaction, which transfers no funds. |
| submit_typed:missing_signature    | Signatures should correspond to inputs owner. When all non-empty inputs have the same owner, signatures should be duplicated. |
| submit_typed:superfluous_signature    | Number of non-empty inputs should match signatures count. Remove redundant signatures. |
