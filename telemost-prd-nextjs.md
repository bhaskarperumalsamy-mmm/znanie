__PRODUCT REQUIREMENTS DOCUMENT__

__Yandex Telemost API Integration__

Teacher–Student Meeting Platform

*Built with Next\.js / React*

__Version__

1\.0 — Initial Draft

__Stack__

Next\.js / React \+ API Routes

__Auth__

Yandex OAuth 2\.0

__Meeting Creator__

Teacher only

__Date__

April 24, 2026

# __1\. Overview__

This PRD defines the requirements for integrating the Yandex Telemost video conferencing API into a Next\.js\-based teacher\-student platform\. The integration will allow teachers to create instant or scheduled meetings, automatically share join links with enrolled students, and cancel meetings when needed — all without leaving the platform\.

The implementation uses Next\.js API Routes as the backend layer, with the Yandex Telemost REST API called server\-side to keep OAuth tokens secure and away from the browser\.

# __2\. Scope & Features__

__\#__

__Feature__

__Priority__

__Who Triggers__

1

Create meeting instantly

P0 — Must have

Teacher

2

Schedule meeting with date & time

P0 — Must have

Teacher

3

Share join link with students

P0 — Must have

Automatic

4

Delete / cancel meeting

P0 — Must have

Teacher

# __3\. User Roles__

__Role__

__Can Create Meeting__

__Can View Join Link__

__Can Cancel Meeting__

Teacher

✅ Yes

✅ Yes

✅ Yes \(own meetings only\)

Student

❌ No

✅ Yes \(enrolled classes only\)

❌ No

Admin

❌ No \(v1\)

✅ Yes \(all\)

❌ No \(v1\)

# __4\. Architecture Overview__

The integration follows a server\-side\-only pattern\. The browser never touches the Yandex API or the OAuth token directly — all calls go through Next\.js API Routes\.

__Request Flow__

Browser \(React\)                Next\.js API Route           Yandex Telemost API

     |                               |                              |

     |\-\- POST /api/meetings \-\-\-\-\-\-\-\->|                              |

     |   \{ classId, scheduledAt \}    |\-\- POST /conferences \-\-\-\-\-\-\-\->|

     |                               |   Authorization: OAuth token |

     |                               |<\-\- \{ id, join\_url \} \-\-\-\-\-\-\-\-\-|

     |                               |\-\- Save to DB                 |

     |<\-\- \{ meetingId, joinUrl \} \-\-\-\-|                              |

     |                               |                              |

__Why server\-side only?__

- OAuth token stays on the server — never exposed to the browser
- Next\.js API Routes act as a secure proxy to Yandex API
- Easier to add rate limiting, logging, and auth middleware

# __5\. Database Schema__

## __5\.1 meetings table__

__Column__

__Type__

__Description__

id

UUID \(PK\)

Internal meeting identifier

conference\_id

VARCHAR

Conference ID returned by Telemost API

join\_url

TEXT

Student\-facing meeting link from Telemost

teacher\_id

UUID \(FK\)

References users table — meeting owner

class\_id

UUID \(FK\)

References classes table

title

VARCHAR

Display name for the meeting

scheduled\_at

TIMESTAMP

When the session is planned to start

is\_instant

BOOLEAN

True = created immediately, False = scheduled

status

ENUM

'scheduled' | 'active' | 'cancelled'

created\_at

TIMESTAMP

Record creation time

cancelled\_at

TIMESTAMP \(null\)

When the meeting was cancelled

# __6\. Next\.js API Routes__

__Method__

__Route__

__Description__

__Auth Required__

POST

/api/meetings

Create instant or scheduled meeting

Teacher

GET

/api/meetings

List meetings \(filter by classId\)

Teacher / Student

GET

/api/meetings/\[id\]

Get single meeting \+ join\_url

Teacher / Student

DELETE

/api/meetings/\[id\]

Cancel meeting

Teacher \(owner only\)

# __7\. Feature Specifications__

## __7\.1 Create Instant Meeting__

Teacher clicks 'Start Meeting Now'\. The platform calls the Telemost API immediately and returns a live join link\.

__API Route — /api/meetings \(POST, instant\)__

// app/api/meetings/route\.js

export async function POST\(request\) \{

  const \{ classId, title, scheduledAt \} = await request\.json\(\);

  const teacher = await getServerSession\(\); // your auth

  // Call Yandex Telemost

  const res = await fetch\(

    'https://cloud\-api\.yandex\.net/v1/telemost\-api/conferences',

    \{

      method: 'POST',

      headers: \{

        'Authorization': \`OAuth $\{process\.env\.YANDEX\_OAUTH\_TOKEN\}\`,

        'Content\-Type': 'application/json',

      \},

      body: JSON\.stringify\(\{\}\),

    \}

  \);

  if \(\!res\.ok\) \{

    return Response\.json\(\{ error: 'Failed to create meeting' \}, \{ status: 502 \}\);

  \}

  const \{ id: conferenceId, join\_url: joinUrl \} = await res\.json\(\);

  // Save to your database

  const meeting = await db\.meetings\.create\(\{

    conferenceId,

    joinUrl,

    teacherId: teacher\.id,

    classId,

    title: title || 'Class Session',

    scheduledAt: scheduledAt || new Date\(\),

    isInstant: \!scheduledAt,

    status: 'scheduled',

  \}\);

  return Response\.json\(\{ meetingId: meeting\.id, joinUrl \}\);

\}

## __7\.2 Schedule Meeting with Date & Time__

Teacher picks a future date and time\. The meeting link is generated immediately via the Telemost API but is displayed to students only on the class dashboard \(not pushed until session time in v1\)\.

__React Component — Schedule Form__

// components/ScheduleMeetingForm\.jsx

'use client';

import \{ useState \} from 'react';

export default function ScheduleMeetingForm\(\{ classId \}\) \{

  const \[title, setTitle\] = useState\(''\);

  const \[scheduledAt, setScheduledAt\] = useState\(''\);

  const \[loading, setLoading\] = useState\(false\);

  async function handleSubmit\(e\) \{

    e\.preventDefault\(\);

    setLoading\(true\);

    const res = await fetch\('/api/meetings', \{

      method: 'POST',

      headers: \{ 'Content\-Type': 'application/json' \},

      body: JSON\.stringify\(\{ classId, title, scheduledAt \}\),

    \}\);

    const data = await res\.json\(\);

    if \(data\.joinUrl\) alert\('Meeting created: ' \+ data\.joinUrl\);

    setLoading\(false\);

  \}

  return \(

    <form onSubmit=\{handleSubmit\}>

      <input value=\{title\} onChange=\{e => setTitle\(e\.target\.value\)\} placeholder='Session title' />

      <input type='datetime\-local' value=\{scheduledAt\} onChange=\{e => setScheduledAt\(e\.target\.value\)\} />

      <button type='submit' disabled=\{loading\}>

        \{loading ? 'Creating\.\.\.' : 'Schedule Meeting'\}

      </button>

    </form>

  \);

\}

## __7\.3 Share Meeting Link with Students__

Once a meeting is created, enrolled students automatically see the join link on their class dashboard\. No manual sharing is required from the teacher\.

__Student Dashboard — Join Link Display__

// app/student/class/\[classId\]/page\.jsx

export default async function ClassPage\(\{ params \}\) \{

  const meetings = await db\.meetings\.findMany\(\{

    where: \{ classId: params\.classId, status: 'scheduled' \},

    orderBy: \{ scheduledAt: 'asc' \},

  \}\);

  return \(

    <div>

      <h2>Upcoming Sessions</h2>

      \{meetings\.map\(meeting => \(

        <div key=\{meeting\.id\}>

          <p>\{meeting\.title\}</p>

          <p>\{new Date\(meeting\.scheduledAt\)\.toLocaleString\(\)\}</p>

          <a href=\{meeting\.joinUrl\} target='\_blank'>

            Join Meeting

          </a>

        </div>

      \)\)\}

    </div>

  \);

\}

⚠  Students do not need a Yandex account to join\. The join link works in any browser — just share the joinUrl directly\.

## __7\.4 Delete / Cancel Meeting__

Teacher clicks 'Cancel Meeting'\. The platform calls the Telemost DELETE endpoint and marks the meeting as cancelled in the database\. Students will no longer see the join link\.

__API Route — /api/meetings/\[id\] \(DELETE\)__

// app/api/meetings/\[id\]/route\.js

export async function DELETE\(request, \{ params \}\) \{

  const teacher = await getServerSession\(\);

  const meeting = await db\.meetings\.findUnique\(\{ where: \{ id: params\.id \} \}\);

  if \(\!meeting\) return Response\.json\(\{ error: 'Not found' \}, \{ status: 404 \}\);

  if \(meeting\.teacherId \!== teacher\.id\)

    return Response\.json\(\{ error: 'Forbidden' \}, \{ status: 403 \}\);

  // Cancel on Telemost

  await fetch\(

    \`https://cloud\-api\.yandex\.net/v1/telemost\-api/conferences/$\{meeting\.conferenceId\}\`,

    \{

      method: 'DELETE',

      headers: \{ 'Authorization': \`OAuth $\{process\.env\.YANDEX\_OAUTH\_TOKEN\}\` \},

    \}

  \);

  // Update DB

  await db\.meetings\.update\(\{

    where: \{ id: params\.id \},

    data: \{ status: 'cancelled', cancelledAt: new Date\(\) \},

  \}\);

  return Response\.json\(\{ success: true \}\);

\}

# __8\. Environment Configuration__

__\.env\.local \(Development\)__

\# Yandex OAuth — personal token for dev testing

YANDEX\_OAUTH\_TOKEN=y0\_\_wgBEKTVj\.\.\.your\_full\_token\_here

\# Telemost base URL

TELEMOST\_API\_URL=https://cloud\-api\.yandex\.net/v1/telemost\-api

\# Your OAuth app credentials \(for production OAuth flow later\)

YANDEX\_CLIENT\_ID=7be23482f67641ed8239dc3015ac727c

YANDEX\_CLIENT\_SECRET=708a680988054c3ebea0da6217c3513c

__\.env\.production__

\# In production, each teacher's token is stored in the DB after OAuth login

\# YANDEX\_OAUTH\_TOKEN is NOT used in production

YANDEX\_CLIENT\_ID=7be23482f67641ed8239dc3015ac727c

YANDEX\_CLIENT\_SECRET=<store in Vercel/hosting secrets — never commit>

TELEMOST\_API\_URL=https://cloud\-api\.yandex\.net/v1/telemost\-api

⚠  Never commit \.env\.local to git\. Add it to \.gitignore immediately\. The Client Secret must only live in your hosting provider's secret manager \(e\.g\. Vercel Environment Variables\)\.

# __9\. Security Requirements__

__Requirement__

__Implementation__

OAuth token never reaches browser

All Telemost API calls made in Next\.js API Routes \(server\-side only\)

Only meeting owner can delete

Check meeting\.teacherId === session\.user\.id before DELETE

Students only see their class meetings

Filter meetings by enrolled classId in DB query

Secrets never in source code

Use \.env\.local locally; Vercel Env Vars in production

Rate limit meeting creation

Max 10 meetings per teacher per hour using middleware

# __10\. Error Handling__

__Scenario__

__HTTP Status__

__User\-Facing Message__

Telemost API returns error

502 Bad Gateway

'Could not create meeting\. Please try again\.'

Teacher not authenticated

401

'Please log in to create a meeting\.'

Teacher tries to delete another's meeting

403

'You do not have permission to cancel this meeting\.'

Meeting not found

404

'Meeting not found\.'

Telemost 404 on delete \(already gone\)

—

Still mark as cancelled in DB — treat as success

# __11\. Development Milestones__

__Phase__

__Task__

__Status__

Phase 1 – Setup

Register OAuth app on oauth\.yandex\.ru

✅ Done

Phase 1 – Setup

Obtain personal OAuth dev token

✅ Done

Phase 1 – Setup

Add YANDEX\_OAUTH\_TOKEN to \.env\.local

⬜ To Do

Phase 2 – Database

Create meetings table with all required columns

⬜ To Do

Phase 2 – Database

Link meetings FK to users \(teacher\) and classes

⬜ To Do

Phase 3 – API Routes

POST /api/meetings — create instant & scheduled

⬜ To Do

Phase 3 – API Routes

GET /api/meetings — list meetings by class

⬜ To Do

Phase 3 – API Routes

DELETE /api/meetings/\[id\] — cancel meeting

⬜ To Do

Phase 4 – Frontend

Teacher: Create Meeting button \(instant\)

⬜ To Do

Phase 4 – Frontend

Teacher: Schedule Meeting form \(date/time picker\)

⬜ To Do

Phase 4 – Frontend

Teacher: Cancel Meeting button with confirmation

⬜ To Do

Phase 4 – Frontend

Student: Show upcoming meetings with Join button

⬜ To Do

Phase 5 – Auth \(Prod\)

Implement Yandex OAuth login flow for teachers

⬜ To Do

Phase 5 – Auth \(Prod\)

Store & retrieve per\-teacher OAuth tokens from DB

⬜ To Do

Phase 6 – QA

End\-to\-end test: create → share → join → cancel

⬜ To Do

# __12\. Out of Scope \(v1\)__

- Recording meetings automatically
- Sending email / push notifications to students when meeting is created
- Waiting room configuration
- Live streaming to external platforms
- Admin ability to create or cancel meetings
- Embedding the Telemost video UI inside the platform
- CalDAV / Yandex Calendar sync

# __13\. References & Credentials__

__Resource__

__Value / Link__

Telemost API Docs

https://yandex\.ru/dev/telemost/doc/ru/

Telemost API Base URL

https://cloud\-api\.yandex\.net/v1/telemost\-api/conferences

OAuth App Dashboard

https://oauth\.yandex\.ru/

OAuth Token URL

https://oauth\.yandex\.ru/authorize?response\_type=token&client\_id=\.\.\.

Client ID

7be23482f67641ed8239dc3015ac727c

Redirect URI

https://oauth\.yandex\.ru/verification\_code

