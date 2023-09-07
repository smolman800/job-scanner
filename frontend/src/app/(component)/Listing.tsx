export default function Listing({ item }) {
  return (
    <div
      className="listing"
      key={item.id}
      style={{
        backgroundColor: 'white',
        marginBottom: '1%',
        width: '100%',
        height: '20vh',
        borderRadius: '8px',
        transition: 'border 0.3s ease',
        display: 'flex',
      }}
    >
      <div
        className="listing-logo"
        style={{
          height: '100%',
          width: '10%',
        }}
      >
        <img
          src="/shopee-logo.png"
          style={{ width: '100%', height: '100%', padding: '5%' }}
        />
      </div>
      <div
        className="listing-title-company"
        style={{
          height: '100%',
          width: '50%',
          padding: '1%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="jobTitle">
          <u>
            <span>Job Title</span>
          </u>
          <br />
          <b>
            <span style={{ fontSize: '1.2em' }}>{item.jobTitle}</span>
          </b>
        </div>
        <div
          className="company"
          style={{
            marginTop: 'auto',
          }}
        >
          <u>
            <span>Company</span>
          </u>
          <br />
          <b>
            <span>{item.company}</span>
          </b>
        </div>
      </div>
      <div
        className="salary"
        style={{
          height: '100%',
          width: '20%',
          padding: '1%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginTop: 'auto' }}>
          <u>
            <span>Salary</span>
          </u>
          <br />
          <b>
            <span>
              {item.salaryMin} - {item.salaryMax} {item.currency}
            </span>
          </b>
        </div>
      </div>
      <div
        className="date-and-industry"
        style={{
          height: '100%',
          width: '20%',
          padding: '1%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="date" style={{ marginLeft: 'auto' }}>
          <span>{item.postDate}</span>
        </div>
        <div
          className="industry"
          style={{ marginTop: 'auto', marginLeft: 'auto' }}
        >
          <b>
            <span>{item.industry}</span>
          </b>
        </div>
      </div>
    </div>
  );
}
