# ROM.TSIS2.Webresources

[![Build Status](https://dev.azure.com/transport-canada/Inspection%20Solution%20Architecture%20WG/_apis/build/status/ROMTS-GSRST/Create%20TSIS2.WebResources%20Artifact?branchName=main)](https://dev.azure.com/transport-canada/Inspection%20Solution%20Architecture%20WG/_build/latest?definitionId=483&branchName=main)

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
    <add key="jsLib" value="../Webresources/lib" />
    <add key="mfaAppId" value="<Your App Id>" />
    <add key="mfaClientSecret" value="<Your Client Secret>"/>
    <add key="method" value="ClientSecret"/>
  </appSettings>
</configuration>
```

**NOTE:** The Multi Factor Authentication paramaters (mfaAppId and mfaReturnUrl) in the sample above are dev/prototyping values provided by Microsoft. Don't use these values against PROD.

3. After setting up this configuration file, you can run the `XrmDefinitelyTyped.exe` executable to generate the Xrm Types.

### Coding Scripts
1. TypeScript source is located in the `src` folder.
    a. Namespaced code is located at the root of `src`. This is the source that will ultimately be referenced in D365.
    b. Module code is located in individual folders in `src` (i.e. Account). This is the source can be imported and in tests and in the namespaced code.
2. TypeScript files are transpiled to `Webresources\js`. If you don't see the transpiled file, be sure the `Show All Files` option in the `Solution Explorer` is on.
3. The JavaScript source files are the files that are mapped for deployment in our D365 environment as defined in the `spkl.json` configuration file.
4. When creating a new script, start with TypeScript and be sure to map the resulting transpiled JavaScript in the `spkl.json` file.

### Writing Tests
1. Tests are located in the `tests` folder.
2. Tests are written using [Jest](https://github.com/facebook/jest) and Xrm is mocked using [xrm-mock](https://github.com/camelCaseDave/xrm-mock).
3. To run tests, open a terminal and be sure to be in the `TSIS2.Webresources` directory.

```
npm run test
```

### Other Web Resources (HTML, CSS)
1. These can be directly created in the `Webresources` folder under the subfolder matching the type of web resource (i.e. html or css).
2. Mapping these to the D365 web resources are also done in the `spkl.json` configuration file.


### Manually Deploying WebResources
1. To manually deploy web resources, open a terminal and be sure to be in the `TSIS2.WebResources` directory.
2. To transpile the Typescript source to Javascript we use [rollup](https://rollupjs.org/). To do it, run the following command

```
npm run build
```

3. Run the `.\spkl\deploy-webresources.bat` batch file to deploy the web resources manually.

**NOTE:** The solution that the web resources are deployed is configurable in the `spkl.json` configuration file.

 To learn more about the the tool we use for deployment, check out the [spkl task runner](https://github.com/scottdurow/SparkleXrm/wiki/spkl).
