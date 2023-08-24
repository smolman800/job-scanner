const HEADERS = {
  authority: 'xapi.supercharge-srp.co',
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/json',
  origin: 'https://th.jobsdb.com',
  referer: 'https://th.jobsdb.com/',
  'sec-ch-ua':
    '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
};

// ---------------- Job Listing Settings ----------------

const JOB_LISTING_BODY = (pageNo: number) => {
  return {
    query: `query getJobs(
        $country: String,
        $locale: String,
        $keyword: String,
        $createdAt: String,
        $jobFunctions: [Int],
        $categories: [String],
        $locations: [Int],
        $careerLevels: [Int],
        $minSalary: Int,
        $maxSalary: Int,
        $salaryType: Int,
        $candidateSalary: Int,
        $candidateSalaryCurrency: String,
        $datePosted: Int,
        $jobTypes: [Int],
        $workTypes: [String],
        $industries: [Int],
        $page: Int,
        $pageSize: Int,
        $companyId: String,
        $advertiserId: String,
        $userAgent: String,
        $accNums: Int,
        $subAccount: Int,
        $minEdu: Int,
        $maxEdu: Int,
        $edus: [Int],
        $minExp: Int,
        $maxExp: Int,
        $seo: String,
        $searchFields: String,
        $candidateId: ID,
        $isDesktop: Boolean,
        $isCompanySearch: Boolean,
        $sort: String,
        $sVi: String,
        $duplicates: String,
        $flight: String,
        $solVisitorId: String
    ) {
      jobs(
        country: $country,
        locale: $locale,
        keyword: $keyword,
        createdAt: $createdAt,
        jobFunctions: $jobFunctions,
        categories: $categories,
        locations: $locations,
        careerLevels: $careerLevels,
        minSalary: $minSalary,
        maxSalary: $maxSalary,
        salaryType: $salaryType,
        candidateSalary: $candidateSalary,
        candidateSalaryCurrency: $candidateSalaryCurrency,
        datePosted: $datePosted,
        jobTypes: $jobTypes,
        workTypes: $workTypes,
        industries: $industries,
        page: $page,
        pageSize: $pageSize,
        companyId: $companyId,
        advertiserId: $advertiserId,
        userAgent: $userAgent,
        accNums: $accNums,
        subAccount: $subAccount,
        minEdu: $minEdu,
        edus: $edus,
        maxEdu: $maxEdu,
        minExp: $minExp,
        maxExp: $maxExp,
        seo: $seo,
        searchFields: $searchFields,
        candidateId: $candidateId,
        isDesktop: $isDesktop,
        isCompanySearch: $isCompanySearch,
        sort: $sort,
        sVi: $sVi,
        duplicates: $duplicates,
        flight: $flight,
        solVisitorId: $solVisitorId
      ) {
        total
        totalJobs
        relatedSearchKeywords {
          keywords
          type
          totalJobs
        }
        solMetadata
        suggestedEmployer {
          name
          totalJobs
        }
        queryParameters {
          key
          searchFields
          pageSize
        }
        experiments {
          flight
        }
        jobs {
          id
          adType
          sourceCountryCode
          isStandout
          companyMeta {
            id
            advertiserId
            isPrivate
            name
            logoUrl
            slug
          }
          jobTitle
          jobUrl
          jobTitleSlug
          description
          employmentTypes {
            code
            name
          }
          sellingPoints
          locations {
            code
            name
            slug
            children {
              code
              name
              slug
            }
          }
          categories {
            code
            name
            children {
              code
              name
            }
          }
          postingDuration
          postedAt
          salaryRange {
            currency
            max
            min
            period
            term
          }
          salaryVisible
          bannerUrl
          isClassified
          solMetadata
        }
      }
    }
    `,
    variables: {
      keyword: '',
      jobFunctions: [132, 134, 311, 142, 146],
      locations: [],
      salaryType: 1,
      jobTypes: [],
      createdAt: null,
      careerLevels: [],
      page: pageNo,
      country: 'th',
      sVi: '',
      solVisitorId: '81d8c818-26a0-4854-837b-7683126fbbaa',
      categories: ['132', '134', '311', '142', '146'],
      workTypes: [],
      userAgent:
        'Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/115.0.0.0%20Safari/537.36',
      industries: [],
      locale: 'en',
    },
  };
};

export const JOB_LISTING_CONFIG = {
  httpClientConfig: {
    method: 'POST',
    url: 'https://xapi.supercharge-srp.co/job-search/graphql?country=th&isSmartSearch=true',
    headers: HEADERS,
    data: JOB_LISTING_BODY,
  },
};

// ---------------- Job Details Settings ----------------
const JOB_DETAILS_BODY = (jobId: string) => {
  return {
    query: `
      query getJobDetail(
        $jobId: String, 
        $locale: String, 
        $country: String, 
        $candidateId: ID, 
        $solVisitorId: String, 
        $flight: String
      ) {
        jobDetail(
          jobId: $jobId
          locale: $locale
          country: $country
          candidateId: $candidateId
          solVisitorId: $solVisitorId
          flight: $flight
        ) {
          id
          pageUrl
          jobTitleSlug
          applyUrl {
            url
            isExternal
          }
          isExpired
          isConfidential
          isClassified
          accountNum
          advertisementId
          subAccount
          showMoreJobs
          adType
          header {
            banner {
              bannerUrls {
                large
              }
            }
            salary {
              max
              min
              type
              extraInfo
              currency
              isVisible
            }
            logoUrls {
              small
              medium
              large
              normal
            }
            jobTitle
            company {
              name
              url
              slug
              advertiserId
            }
            review {
              rating
              numberOfReviewer
            }
            expiration
            postedDate
            postedAt
            isInternship
          }
          companyDetail {
            companyWebsite
            companySnapshot {
              avgProcessTime
              registrationNo
              employmentAgencyPersonnelNumber
              employmentAgencyNumber
              telephoneNumber
              workingHours
              website
              facebook
              size
              dressCode
              nearbyLocations
            }
            companyOverview {
              html
            }
            videoUrl
            companyPhotos {
              caption
              url
            }
          }
          jobDetail {
            summary
            jobDescription {
              html
            }
            jobRequirement {
              careerLevel
              yearsOfExperience
              qualification
              fieldOfStudy
              industryValue {
                value
                label
              }
              skills
              employmentType
              languages
              postedDate
              closingDate
              jobFunctionValue {
                code
                name
                children {
                  code
                  name
                }
              }
              benefits
            }
            whyJoinUs
          }
          location {
            location
            locationId
            omnitureLocationId
          }
          sourceCountry
        }
      }
    `,
    variables: {
      jobId: jobId,
      country: 'th',
      locale: 'en',
      candidateId: '',
      solVisitorId: '81d8c818-26a0-4854-837b-7683126fbbaa',
    },
  };
};

export const JOB_DETAILS_CONFIG = {
  httpClientConfig: {
    method: 'POST',
    url: 'https://xapi.supercharge-srp.co/job-search/graphql?country=th&isSmartSearch=true',
    headers: HEADERS,
    data: JOB_DETAILS_BODY,
  },
};
