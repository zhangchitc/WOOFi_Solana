export type Woospmm = {
  "version": "0.1.0",
  "name": "woospmm",
  "instructions": [
    {
      "name": "createOracleChainlink",
      "accounts": [
        {
          "name": "cloracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createOraclePyth",
      "accounts": [
        {
          "name": "pythoracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setStaleDuration",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "staleDuration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setWooBound",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "bound",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setWooRange",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rangeMin",
          "type": "u128"
        },
        {
          "name": "rangeMax",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setWooPrice",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setWooCoeff",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "coeff",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setWooSpread",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "spread",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setCloPreferred",
      "accounts": [
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "cloPreferred",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setWooAdmin",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setWooState",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u128"
        },
        {
          "name": "coeff",
          "type": "u64"
        },
        {
          "name": "spread",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateCloracle",
      "accounts": [
        {
          "name": "cloracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePythoracle",
      "accounts": [
        {
          "name": "pythoracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getPrice",
      "accounts": [
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "GetPriceResult"
      }
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        },
        {
          "name": "feeAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolAdmin",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolFeeAdmin",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolState",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "u16"
        },
        {
          "name": "capBalance",
          "type": "u128"
        },
        {
          "name": "tgtBalance",
          "type": "u128"
        },
        {
          "name": "shiftMax",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolFeeRate",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolCapBalance",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "capBalance",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolTgtBalance",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tgtBalance",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolShiftMax",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "shiftMax",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolMaxGamma",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "maxGamma",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolMaxNotionalSwap",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "maxNotionalSwap",
          "type": "u128"
        }
      ]
    },
    {
      "name": "tryQuery",
      "accounts": [
        {
          "name": "oracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdateFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdateTo",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fromAmount",
          "type": "u128"
        }
      ],
      "returns": {
        "defined": "QueryResult"
      }
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdateFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdateTo",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fromAmount",
          "type": "u128"
        },
        {
          "name": "minToAmount",
          "type": "u128"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feedAccount",
            "type": "publicKey"
          },
          {
            "name": "priceUpdate",
            "type": "publicKey"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "round",
            "type": "i128"
          },
          {
            "name": "outerPreferred",
            "type": "bool"
          },
          {
            "name": "oracleType",
            "type": {
              "defined": "OracleType"
            }
          }
        ]
      }
    },
    {
      "name": "wooPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "woopoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "wooracle",
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "reserve",
            "type": "u128"
          },
          {
            "name": "maxGamma",
            "type": "u128"
          },
          {
            "name": "maxNotionalSwap",
            "type": "u128"
          },
          {
            "name": "capBalance",
            "type": "u128"
          },
          {
            "name": "shiftMax",
            "type": "u16"
          },
          {
            "name": "tgtBalance",
            "type": "u128"
          },
          {
            "name": "protocolFeeOwed",
            "type": "u128"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "baseDecimals",
            "docs": [
              "Number of base 10 digits to the right of the decimal place."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "woOracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "staleDuration",
            "type": "i64"
          },
          {
            "name": "bound",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u128"
          },
          {
            "name": "coeff",
            "type": "u64"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "rangeMin",
            "type": "u128"
          },
          {
            "name": "rangeMax",
            "type": "u128"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GetPriceResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceOut",
            "type": "u128"
          },
          {
            "name": "feasibleOut",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "GetStateResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceOut",
            "type": "u128"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "coeff",
            "type": "u64"
          },
          {
            "name": "feasibleOut",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "QueryResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "toAmount",
            "type": "u128"
          },
          {
            "name": "swapFeeAmount",
            "type": "u128"
          },
          {
            "name": "swapFee",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OracleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pyth"
          },
          {
            "name": "ChainLink"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6001,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6002,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6003,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6004,
      "name": "CapBalanceSmallerThanTargetBalance",
      "msg": "Cap balance smaller than 2 times target balance"
    },
    {
      "code": 6005,
      "name": "IntegerOverflow",
      "msg": "Integer overflow"
    },
    {
      "code": 6006,
      "name": "ConversionFailure",
      "msg": "Conversion failure"
    },
    {
      "code": 6007,
      "name": "MathOverflow",
      "msg": "Mathematical operation with overflow"
    },
    {
      "code": 6008,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6009,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6010,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6011,
      "name": "ProtocolFeeMaxExceeded",
      "msg": "Exceeded max protocol fee"
    },
    {
      "code": 6012,
      "name": "ProtocolFeeNotEnough",
      "msg": "Protocol fee not enough"
    },
    {
      "code": 6013,
      "name": "WooOracleNotFeasible",
      "msg": "Woo oracle is not feasible"
    },
    {
      "code": 6014,
      "name": "WooOraclePriceNotValid",
      "msg": "Woo oracle price is not valid"
    },
    {
      "code": 6015,
      "name": "WooOraclePriceRangeMin",
      "msg": "Woo oracle price below range MIN"
    },
    {
      "code": 6016,
      "name": "WooOraclePriceRangeMax",
      "msg": "Woo oracle price exceed range MAX"
    },
    {
      "code": 6017,
      "name": "WooPoolExceedMaxNotionalValue",
      "msg": "Woo pp exceed max notional value"
    },
    {
      "code": 6018,
      "name": "WooPoolExceedMaxGamma",
      "msg": "Woo pp exceed max gamma"
    },
    {
      "code": 6019,
      "name": "NotEnoughBalance",
      "msg": "Src Balance < LP Deposit Amount."
    },
    {
      "code": 6020,
      "name": "NoPoolMintOutput",
      "msg": "Pool Mint Amount < 0 on LP Deposit"
    },
    {
      "code": 6021,
      "name": "BurnTooMuch",
      "msg": "Trying to burn too much"
    },
    {
      "code": 6022,
      "name": "NotEnoughOut",
      "msg": "Not enough out"
    },
    {
      "code": 6023,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    }
  ]
};

export const IDL: Woospmm = {
  "version": "0.1.0",
  "name": "woospmm",
  "instructions": [
    {
      "name": "createOracleChainlink",
      "accounts": [
        {
          "name": "cloracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createOraclePyth",
      "accounts": [
        {
          "name": "pythoracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setStaleDuration",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "staleDuration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setWooBound",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "bound",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setWooRange",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rangeMin",
          "type": "u128"
        },
        {
          "name": "rangeMax",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setWooPrice",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setWooCoeff",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "coeff",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setWooSpread",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "spread",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setCloPreferred",
      "accounts": [
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "cloPreferred",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setWooAdmin",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setWooState",
      "accounts": [
        {
          "name": "wooracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u128"
        },
        {
          "name": "coeff",
          "type": "u64"
        },
        {
          "name": "spread",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateCloracle",
      "accounts": [
        {
          "name": "cloracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feedAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePythoracle",
      "accounts": [
        {
          "name": "pythoracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getPrice",
      "accounts": [
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "GetPriceResult"
      }
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        },
        {
          "name": "feeAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolAdmin",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolFeeAdmin",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setPoolState",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "u16"
        },
        {
          "name": "capBalance",
          "type": "u128"
        },
        {
          "name": "tgtBalance",
          "type": "u128"
        },
        {
          "name": "shiftMax",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolFeeRate",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolCapBalance",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "capBalance",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolTgtBalance",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tgtBalance",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolShiftMax",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "shiftMax",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPoolMaxGamma",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "maxGamma",
          "type": "u128"
        }
      ]
    },
    {
      "name": "setPoolMaxNotionalSwap",
      "accounts": [
        {
          "name": "woopool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "maxNotionalSwap",
          "type": "u128"
        }
      ]
    },
    {
      "name": "tryQuery",
      "accounts": [
        {
          "name": "oracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdateFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceUpdateTo",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fromAmount",
          "type": "u128"
        }
      ],
      "returns": {
        "defined": "QueryResult"
      }
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdateFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wooracleTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "woopoolTo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdateTo",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fromAmount",
          "type": "u128"
        },
        {
          "name": "minToAmount",
          "type": "u128"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feedAccount",
            "type": "publicKey"
          },
          {
            "name": "priceUpdate",
            "type": "publicKey"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "round",
            "type": "i128"
          },
          {
            "name": "outerPreferred",
            "type": "bool"
          },
          {
            "name": "oracleType",
            "type": {
              "defined": "OracleType"
            }
          }
        ]
      }
    },
    {
      "name": "wooPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "woopoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "wooracle",
            "type": "publicKey"
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "reserve",
            "type": "u128"
          },
          {
            "name": "maxGamma",
            "type": "u128"
          },
          {
            "name": "maxNotionalSwap",
            "type": "u128"
          },
          {
            "name": "capBalance",
            "type": "u128"
          },
          {
            "name": "shiftMax",
            "type": "u16"
          },
          {
            "name": "tgtBalance",
            "type": "u128"
          },
          {
            "name": "protocolFeeOwed",
            "type": "u128"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "baseDecimals",
            "docs": [
              "Number of base 10 digits to the right of the decimal place."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "woOracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "staleDuration",
            "type": "i64"
          },
          {
            "name": "bound",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u128"
          },
          {
            "name": "coeff",
            "type": "u64"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "rangeMin",
            "type": "u128"
          },
          {
            "name": "rangeMax",
            "type": "u128"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GetPriceResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceOut",
            "type": "u128"
          },
          {
            "name": "feasibleOut",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "GetStateResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceOut",
            "type": "u128"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "coeff",
            "type": "u64"
          },
          {
            "name": "feasibleOut",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "QueryResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "toAmount",
            "type": "u128"
          },
          {
            "name": "swapFeeAmount",
            "type": "u128"
          },
          {
            "name": "swapFee",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OracleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pyth"
          },
          {
            "name": "ChainLink"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6001,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6002,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6003,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6004,
      "name": "CapBalanceSmallerThanTargetBalance",
      "msg": "Cap balance smaller than 2 times target balance"
    },
    {
      "code": 6005,
      "name": "IntegerOverflow",
      "msg": "Integer overflow"
    },
    {
      "code": 6006,
      "name": "ConversionFailure",
      "msg": "Conversion failure"
    },
    {
      "code": 6007,
      "name": "MathOverflow",
      "msg": "Mathematical operation with overflow"
    },
    {
      "code": 6008,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6009,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6010,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6011,
      "name": "ProtocolFeeMaxExceeded",
      "msg": "Exceeded max protocol fee"
    },
    {
      "code": 6012,
      "name": "ProtocolFeeNotEnough",
      "msg": "Protocol fee not enough"
    },
    {
      "code": 6013,
      "name": "WooOracleNotFeasible",
      "msg": "Woo oracle is not feasible"
    },
    {
      "code": 6014,
      "name": "WooOraclePriceNotValid",
      "msg": "Woo oracle price is not valid"
    },
    {
      "code": 6015,
      "name": "WooOraclePriceRangeMin",
      "msg": "Woo oracle price below range MIN"
    },
    {
      "code": 6016,
      "name": "WooOraclePriceRangeMax",
      "msg": "Woo oracle price exceed range MAX"
    },
    {
      "code": 6017,
      "name": "WooPoolExceedMaxNotionalValue",
      "msg": "Woo pp exceed max notional value"
    },
    {
      "code": 6018,
      "name": "WooPoolExceedMaxGamma",
      "msg": "Woo pp exceed max gamma"
    },
    {
      "code": 6019,
      "name": "NotEnoughBalance",
      "msg": "Src Balance < LP Deposit Amount."
    },
    {
      "code": 6020,
      "name": "NoPoolMintOutput",
      "msg": "Pool Mint Amount < 0 on LP Deposit"
    },
    {
      "code": 6021,
      "name": "BurnTooMuch",
      "msg": "Trying to burn too much"
    },
    {
      "code": 6022,
      "name": "NotEnoughOut",
      "msg": "Not enough out"
    },
    {
      "code": 6023,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    }
  ]
};