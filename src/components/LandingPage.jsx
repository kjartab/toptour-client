import React from 'react';

// const serverUrl = "https://api.trd.toptour.no";
const serverUrl = "http://localhost:3010";

const LandingPage = () => {
    return (
    <div>
        <h1>Toptour</h1>
        <p>Velkommen til Norges mest avanserte toppturguide. 
        Her finner du de beste turene fra UT.no i lag med informasjon om vær-, føre- og snøforhold. Du kan sette opp pudderalarm på dine favoritturer slik at du kan bruke mer tid på å ha det moro og mindre tid på planlegging!
    </p>
    <p>Logg inn for å få tilgang</p>
    <div><a href={serverUrl + "/auth/facebook?redirect=https://www.toptour.no"}>Facebook</a></div>
    <div><a href={serverUrl + "/auth/google?redirect=https://www.toptour.no"}>Google</a></div>
    <div><a href={serverUrl + "/auth/azure?redirect=https://www.toptour.no"}>Azure</a></div>

    <p>Er du usikker på om dette er noe for deg? Sjekk ut ...</p>
    </div>
    )
}

export default LandingPage;