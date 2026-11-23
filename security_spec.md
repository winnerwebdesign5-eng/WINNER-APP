# Security Specification — Winner Designs Portfolio & Admin Dashboard

## 1. Data Invariants
1. **Admin-Only Mutations**: Only an authenticated, email-verified Winner Designs admin (`winnerwebdesign5@gmail.com` or an existing `/admins/{uid}` record) can create, update, or delete `/projects/{projectId}` documents.
2. **Public Visibility Boundary**: Unauthenticated visitors and non-admin users may only read `/projects/{projectId}` documents where `published == true`. Draft projects (`published == false`) are strictly restricted to the admin.
3. **Immutable Ownership & Creation Time**: `ownerId` must equal `request.auth.uid` on creation and cannot be changed on update. `createdAt` must equal `request.time` on creation and cannot be modified on update. `updatedAt` must equal `request.time` on both create and update.
4. **Strict Schema & Size Guards**: Shadow/extra keys are rejected via `hasAll` + `hasOnly` on creation and `affectedKeys().hasOnly(...)` on update. All strings enforce strict min/max lengths, and `liveUrl` must start with `http://` or `https://`.
5. **Privilege Escalation Prevention**: Non-bootstrapped users cannot create, update, or delete `/admins/{userId}` documents or list the `/admins` collection.

## 2. Adversarial Payloads ("Dirty Dozen")
1. **Unauthenticated Create**: Visitor with `auth == null` attempts `create` on `/projects/p1` -> `PERMISSION_DENIED`.
2. **Non-Admin Authenticated Create**: Signed-in Google user (`other@example.com`, `email_verified: true`) attempts `create` on `/projects/p1` -> `PERMISSION_DENIED`.
3. **Unverified Admin Email Spoof**: Signed-in user with `email: 'winnerwebdesign5@gmail.com'` and `email_verified: false` attempts `create` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection**: Admin attempts `create` with extra field `isFeaturedOverride: true` -> `PERMISSION_DENIED`.
5. **Invalid Document ID Poisoning**: Admin attempts `create` on `/projects/invalid$id!` -> `PERMISSION_DENIED`.
6. **JavaScript URI Injection in Live Link**: Admin attempts `create` with `liveUrl: 'javascript:alert(1)'` -> `PERMISSION_DENIED`.
7. **Client Timestamp Spoofing**: Admin attempts `create` with forged `createdAt` not equal to `request.time` -> `PERMISSION_DENIED`.
8. **Immutable Field Mutation on Update**: Admin attempts `update` changing `ownerId` or `createdAt` -> `PERMISSION_DENIED`.
9. **Oversized Description / Resource Exhaustion**: Admin attempts `create` with `description` exceeding `1500` characters -> `PERMISSION_DENIED`.
10. **Public Draft Leakage (`get`)**: Public visitor attempts `get` on `/projects/draft1` where `published == false` -> `PERMISSION_DENIED`.
11. **Unfiltered Draft Scraping (`list`)**: Public visitor attempts `list` on `/projects` without `where('published', '==', true)` when drafts exist -> `PERMISSION_DENIED`.
12. **Self-Assigned Admin Escalation**: Non-admin user attempts `create` on `/admins/{theirUid}` -> `PERMISSION_DENIED`.
