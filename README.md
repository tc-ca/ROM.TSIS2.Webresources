# ROM.TSIS2.Webresources

[![Build Status](https://dev.azure.com/transport-canada/Inspection%20Solution%20Architecture%20WG/_apis/build/status/TSIS2/Create%20TSIS2.WebResources%20Artifact?branchName=main)](https://dev.azure.com/transport-canada/Inspection%20Solution%20Architecture%20WG/_build/latest?definitionId=483&branchName=main)

## Developer Instructions

### Installation
1. Use Visual Studio for the best experience.
2. After cloning the repository, open the solution file in Visual Studio.
3. Build the solution to restore the NuGet packages and transpile the TypeScript source files.

### Generating Xrm Types
To generate TypeScript declaration files based on our Dynamics 365 solution, we use [XrmDefinitelyTyped](https://github.com/delegateas/XrmDefinitelyTyped/).

1. Create an `XrmDefinitelyTyped.exe.config` file in the XrmDefinitelyTyped folder
2. The contents of this configuration file should be similar to the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="url" value="https://<your_instance>.crm3.dynamics.com/xrmservices/2011/Organization.svc" />
    <add key="username" value="username@tc.gc.ca" />
    <add key="out" value="../typings/XRM" />
    <add key="solutions" value="<your solution>" />
    <add key="entities" value="<comma separated list of entities>" />
    <add key="web" value="" />
    <add key="jsLib" value="../src/lib" />
    <add key="mfaAppId" value="51f81489-12ee-4a9e-aaae-a2591f45987d" />
    <add key="mfaReturnUrl" value="app://58145b91-0c36-4500-8554-080854f2ac97"/>
    <add key="method" value="OAuth"/>
  </appSettings>
</configuration>
```

**NOTE:** The Multi Factor Authentication paramaters (mfaAppId and mfaReturnUrl) in the sample above are dev/prototyping values provided by Microsoft. Don't use these values against PROD.

3. After setting up this configuration file, you can run the `XrmDefinitelyTyped.exe` executable to generate the Xrm Types.

### Coding Scripts
1. TypeScript source is located in the `src\ts` folder.
2. Whenever the solution is built, the TypeScript files are transpiled to `Webresources\js`. If you don't see the transpiled file, be sure the `Show All Files` option in the `Solution Explorer` is on.
3. The JavaScript source files are the files that are mapped for deployment in our D365 environment as defined in the `spkl.json` configuration file.
4. When creating a new script, start with TypeScript and be sure to map the resulting transpiled JavaScript in the `spkl.json` file.

### Other Web Resources (HTML, CSS)
1. These can be directly created in the `Webresources` folder under the subfolder matching the type of web resource (i.e. html or css).
2. Mapping these to the D365 web resources are also done in the `spkl.json` configuration file.


### Manually Deploying WebResources
1. To manually deploy web resources, open a Developer Command Prompt.
2. Be sure to be in the `TSIS2.WebResources\spkl` directory.
3. Use the `deploy-webresources.bat` batch file to deploy web resources.

**NOTE:** The solution that the web resources are deployed is configurable in the `spkl.json` configuration file.

 To learn more about the the tool we use for deployment, check out the [spkl task runner](https://github.com/scottdurow/SparkleXrm/wiki/spkl).