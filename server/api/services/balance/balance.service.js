import l from '../../../common/logger';

const transaction = require('../../../blockchain/transaction/transaction');

class BalanceService {
  getBalance(req, res) {
    const args = [];

    args.push(req.params.id);
    return Promise.resolve(transaction.queryChainCode(null, 'mychannel', 'balance',
      args, 'query', 'admin', 'org1'));
  }

  move(req, res) {
    l.info(`${this.constructor.name}.byId(${req})`);
    const args = [];

    args.push(req.body.from);
    args.push(req.body.to);
    args.push(req.body.amount.toString());

    return Promise.resolve(transaction.invokeChainCode(null, 'mychannel', 'balance',
      'move', args, 'admin', 'org1'));
  }

  addUser(req, res) {
    l.info(`${this.constructor.name}.byId(${req})`);
    const args = [];
    const peers = [];

    args.push(req.body.name);
    args.push(req.body.balance.toString());

    peers.push('peer0.org1.example.com');
    peers.push('peer1.org1.example.com');
    peers.push('peer0.org2.example.com');
    peers.push('peer1.org2.example.com');

    l.debug(`invoke peers:${peers}`);
    return Promise.resolve(transaction.invokeChainCode(null, 'mychannel', 'balance',
      'add', args, 'admin', 'org1'));
  }
}

export default new BalanceService();
