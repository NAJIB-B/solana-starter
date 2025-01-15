import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "/home/najib/.config/solana/id.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("FhUpXJoPLD9jt54BRuuq24eBiC5sk7YPkRCkNikc6uVF");

// Recipient address
const to = new PublicKey("BkzDWpverYNSRXsobMEqjNrsCRtThQaHbWZxNZ5zvjyX");

(async () => {
    try {

		
        // Get the token account of the fromWallet address, and if it does not exist, create it
		const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey );

        // Get the token account of the toWallet address, and if it does not exist, create it
		const ata_to = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to );

        // Transfer the new token to the "toTokenAccount" we just created
		const tx = await transfer(connection, keypair, ata.address, ata_to.address, keypair, 1e6);	

		console.log(`tx: ${tx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();