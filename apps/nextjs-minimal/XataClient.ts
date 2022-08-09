import {
  BaseClient,
  Query,
  Repository,
  RestRespositoryFactory,
  XataClientOptions,
  XataRecord,
} from '@xata.io/client'

const links = {}

export class XataClient extends BaseClient<{}> {
  constructor(options: XataClientOptions) {
    super(options, links)
    const factory = options.repositoryFactory || new RestRespositoryFactory()
    this.db = {}
  }
}
