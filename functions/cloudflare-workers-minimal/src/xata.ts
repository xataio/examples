import {
  BaseClient,
  Query,
  Repository,
  RestRespositoryFactory,
  XataClientOptions,
  XataRecord,
} from '@xata.io/client'

export interface Url extends XataRecord {
  destination?: string | null
  slug?: string | null
  ownerIp?: string | null
}

const links = { urls: [] }

export class XataClient extends BaseClient<{
  urls: Repository<Url>
}> {
  constructor(options: XataClientOptions) {
    super(
      {
        databaseURL: 'https://url-shortener-u7o0j6.xata.sh/db/xata-short',
        ...options,
      },
      links,
    )
    const factory = options.repositoryFactory || new RestRespositoryFactory()
    this.db = {
      urls: factory.createRepository(this, 'urls'),
    }
  }
}
