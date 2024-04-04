import {
  allocate,
  entryPoint,
  execute,
  IPostContractCallJP,
  PostContractCallInput,
  PreContractCallInput,
  IPreContractCallJP,
} from "@artela/aspect-libs";

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPostContractCallJP, IPreContractCallJP {

  /**
   * isOwner is the governance account implemented by the Aspect, when any of the governance operation
   * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
   * against the initiator's account to make sure it has the permission.
   *
   * @param sender address of the transaction
   * @return true if check success, false if check fail
   */
  isOwner(sender: Uint8Array): bool {
    return false;
  }

  preContractCall(input: PreContractCallInput): void {

    this.triggerAPI(input);
    //
  }

  triggerAPI(condition: string, user: string): void {
    const currentPortfolio = this.portfolios[user];
    const newPortfolio = this.calculateNewPortfolio(user);

    if (this.shouldTriggerAPI(condition, currentPortfolio, newPortfolio)) {
      this.callDefiAPI();
    }
  }

  calculateNewPortfolio(user: string): string {
    return this.hashUser(user);
  }

  shouldTriggerAPI(condition: string, currentPortfolio: string, newPortfolio: string): boolean {
    const [decreasePercentage, increasePercentage] = this.parseCondition(condition);
    const changePercentage = this.calculateChangePercentage(currentPortfolio, newPortfolio);

    return changePercentage <= decreasePercentage || changePercentage >= increasePercentage;
  }

  parseCondition(condition: string): [number, number] {
    let decreasePercentage: number;
    let increasePercentage: number;

    // Parse comma-separated decrease and increase percentages
    // Example input: "10%,20%"
    // Parsed as decrease by 10%, increase by 20%

    // Utility function
    return [decreasePercentage, increasePercentage];
  }

  calculateChangePercentage(currentPortfolio: string, newPortfolio: string): number {
    return 10; // Simulated 10% change
  }

  callDefiAPI(): void {
    // Todo Call Defi APIs
  }

  private hashUser(user: string): string {
    return ""; // Implement hash function here
  }

}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export {execute, allocate}

