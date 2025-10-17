# SafeChain Algorand Smart Contract (PyTeal)
# This would be the actual smart contract deployed to Algorand

from pyteal import *

class SafeChainContract:
    """
    Algorand Smart Contract for SafeChain SOS Platform
    
    Features:
    - Record SOS alerts on-chain
    - Issue HELP reward tokens
    - Verify responder identities
    - Store IPFS hashes for media
    """
    
    def __init__(self):
        self.global_state = {}
        self.local_state = {}
    
    def approval_program(self):
        """Main contract logic"""
        
        # Global state keys
        TOTAL_ALERTS = Bytes("total_alerts")
        HELP_TOKEN_ID = Bytes("help_token_id")
        VERIFIED_RESPONDERS = Bytes("verified_responders")
        
        # Local state keys
        USER_ALERTS = Bytes("user_alerts")
        USER_HELP_BALANCE = Bytes("user_help_balance")
        USER_REPUTATION = Bytes("user_reputation")
        
        # Contract initialization
        init = Seq([
            Assert(Txn.application_args.length() == Int(0)),
            Approve()
        ])
        
        # Register SOS alert on-chain
        register_sos = Seq([
            Assert(Txn.application_args.length() == Int(4)),
            # Args: user_id, latitude, longitude, ipfs_hash
            IncrementGlobal(TOTAL_ALERTS),
            IncrementLocal(USER_ALERTS, Txn.sender()),
            Approve()
        ])
        
        # Issue HELP tokens to responders
        reward_responder = Seq([
            Assert(Txn.application_args.length() == Int(2)),
            # Args: responder_address, amount
            IncrementLocal(USER_HELP_BALANCE, Txn.sender()),
            Approve()
        ])
        
        # Verify responder identity
        verify_responder = Seq([
            Assert(Txn.application_args.length() == Int(2)),
            # Args: responder_address, credential_proof
            Approve()
        ])
        
        return Cond(
            [Txn.application_id() == Int(0), init],
            [Txn.on_completion() == OnComplete.OptIn, Approve()],
            [Txn.application_args[0] == Bytes("register_sos"), register_sos],
            [Txn.application_args[0] == Bytes("reward_responder"), reward_responder],
            [Txn.application_args[0] == Bytes("verify_responder"), verify_responder],
        )
    
    @staticmethod
    def clear_state_program():
        """Allow users to clear their local state"""
        return Approve()


# Helper function to IncrementGlobal
def IncrementGlobal(key):
    return App.globalPut(
        key,
        App.globalGet(key) + Int(1)
    )


# Helper function to IncrementLocal
def IncrementLocal(key, address):
    return App.localPut(
        address,
        key,
        App.localGet(address, key) + Int(1)
    )
