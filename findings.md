# Findings - NetShield IDS

## Project

NetShield IDS - Network Intrusion Detection Dashboard

## Findings Summary

The system analyzes Suricata IDS alert logs and identifies suspicious network activities.

## Detected Attack Categories

- SSH brute force attempts
- SQL injection patterns
- Port scanning activity
- Malware traffic patterns
- Suspicious DNS queries
- Suspicious SMB connections
- RDP attack attempts

## High Severity Findings

High severity alerts indicate critical security risks such as brute force attempts, SQL injection traffic, and malware communication.

## Medium Severity Findings

Medium severity alerts indicate suspicious network behavior such as port scanning, SMB access, or RDP login attempts.

## Low Severity Findings

Low severity alerts indicate suspicious but less critical network events that should be monitored.

## Security Impact

Detected attacks may lead to:

- Unauthorized access
- Credential brute forcing
- Data theft
- Malware infection
- Network reconnaissance
- Service exploitation

## Recommendation

Security teams should review high severity alerts first, block suspicious IP addresses, harden exposed services, and monitor repeated attack patterns.