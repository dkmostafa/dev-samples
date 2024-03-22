import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
    IS3CloudFrontStaticWebHostingConstructProps,
    S3CloudFrontStaticWebHostingConstruct
} from "../constructs/s3CloudFrontStaticWebHosting.construct";
export class NextJsStaticAppStack extends Stack{
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const staticS3BucketDistBucket:IS3CloudFrontStaticWebHostingConstructProps = {
            s3BucketConfig:{
                bucketId:"nextjs-static-files",
                bucketName:"nextjs-static-files-sample-123456"
            },
            cloudFrontDistribution:{
                cloudFrontId:"nextjs-static-website"
            },
            pipeLineConfig:{
                account:this.account,
                pipelineName:"NextjsStaticAppSamplePipeline",
                pipelineId:"NextjsStaticAppSamplePipeline",
                githubConfig:{
                    owner:"dkmostafa",
                    repo:"dev-samples",
                    oAuthSecretManagerName:"GitHubToken",
                    branch:"next-js-static-branch"
                },
                buildSpecLocation:"./nextjs-static-webapp-sample/buildspec.yml"
            }
        }

        this.createS3BucketWithCloudFrontDistribution(staticS3BucketDistBucket);

    }

    private createS3BucketWithCloudFrontDistribution(_props:IS3CloudFrontStaticWebHostingConstructProps) {
        const s3BucketWithCFD :S3CloudFrontStaticWebHostingConstruct = new S3CloudFrontStaticWebHostingConstruct(this,"S3CloudFrontStaticWebHostingConstruct",_props);
        return s3BucketWithCFD;
    }


}