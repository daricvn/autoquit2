using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Autoquit.Packaging.Builder
{
    public partial class MainForm : Form
    {
        private IList<string> referencePaths = new BindingList<string>();
        private IList<string> alibContents = new BindingList<string>();
        private IList<string> mapContents = new BindingList<string>();
        private AlibFile currentFile;
        public MainForm()
        {
            InitializeComponent();
        }

        private void BindControls()
        {
            alibBrowser.FileOk += AlibBrowser_FileOk;
            dllBrowser.FileOk += DllBrowser_FileOk;
            lstAlibContent.DataSource = alibContents;
            lstMap.DataSource = mapContents;
            lstReferenceList.DataSource = referencePaths;
            lstReferenceList.SelectedIndexChanged += LstReferenceList_SelectedIndexChanged;
        }

        private void UpdateButton()
        {
            btnAdd.Enabled = !string.IsNullOrEmpty(txtPath.Text);
            btnRemove.Enabled = lstReferenceList.SelectedIndices.Count > 0;
            btnPackage.Enabled = !string.IsNullOrEmpty(txtPath.Text) && System.IO.File.Exists(txtPath.Text);
            btnSave.Enabled = alibContents.Count > 0;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            BindControls();
            UpdateButton();
        }

        private void btnBrowse_Click(object sender, EventArgs e)
        {
            dllBrowser.Multiselect = false;
            dllBrowser.Tag = txtPath;
            dllBrowser.ShowDialog();
        }

        private IEnumerable<int> GetSelectedIndices()
        {
            foreach (int indice in lstReferenceList.SelectedIndices)
                yield return indice;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            dllBrowser.Multiselect = true;
            dllBrowser.Tag = lstReferenceList;
            dllBrowser.ShowDialog();
        }

        private void btnRemove_Click(object sender, EventArgs e)
        {
            if (lstReferenceList.SelectedIndices.Count == 0)
                return;
            if (MessageBox.Show("Are you sure want to remove these item(s)?", "Confirmation", MessageBoxButtons.YesNo) == DialogResult.No)
                return;
            var selectedIndexes = new List<int>(GetSelectedIndices());
            for (var i = selectedIndexes.Count - 1; i >= 0; i--)
            {
                var path = lstReferenceList.Items[selectedIndexes[i]]?.ToString();
                if (path == null)
                    continue;
                referencePaths.Remove(path);
            }
        }

        private void DllBrowser_FileOk(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (dllBrowser.Tag is TextBox txt)
                txt.Text = dllBrowser.FileName;
            else if (dllBrowser.Tag is ListBox lst)
            {
                foreach (var path in dllBrowser.FileNames)
                    if (!referencePaths.Contains(path))
                    {
                        if (path.Equals(txtPath.Text, StringComparison.OrdinalIgnoreCase))
                        {
                            MessageBox.Show("Cannot add main dll as referenced dll", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            return;
                        }
                        referencePaths.Add(path);
                    }
                lst.Update();
            }
            UpdateButton();
        }

        private void AlibBrowser_FileOk(object sender, CancelEventArgs e)
        {
            txtAlibPath.Text = alibBrowser.FileName;
            if (!System.IO.File.Exists(txtAlibPath.Text)) return;
            try
            {
                currentFile = new AlibFile(txtAlibPath.Text);
                alibContents.Clear();
                mapContents.Clear();
                var map = currentFile.LoadMap();
                foreach (var path in currentFile.Files)
                {
                    alibContents.Add(path);
                    if (map != null && map.TryGetValue(path, out string name))
                        mapContents.Add(name);
                    else mapContents.Add(string.Empty);
                }
                UpdateButton();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void LstReferenceList_SelectedIndexChanged(object sender, EventArgs e)
        {
            UpdateButton();
        }

        private void btnAlibBrowse_Click(object sender, EventArgs e)
        {
            alibBrowser.ShowDialog();
        }

        private void btnPackage_Click(object sender, EventArgs e)
        {
            using (var saveFileDialog = new SaveFileDialog())
            {
                saveFileDialog.Filter = "Alib files|*.alib";
                saveFileDialog.AddExtension = true;
                saveFileDialog.FileOk += (_, _) =>
                {
                    var name = saveFileDialog.FileName;
                    Task.Delay(100).ContinueWith(_ =>
                    {
                        if (System.IO.File.Exists(name))
                            System.IO.File.Delete(name);
                        var alib = AlibFactory.Instance.Create(name, txtPath.Text, referencePaths.ToArray());
                        alib.Save();
                        MessageBox.Show("Package has been built.");
                    });
                };
                saveFileDialog.ShowDialog();
            }
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (currentFile == null)
                return;
            var result = folderBrowser.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var root = folderBrowser.SelectedPath;
            Task.Delay(100).ContinueWith((_) =>
            {
                foreach (var path in currentFile.Files)
                {
                    var actualPath = System.IO.Path.Combine(root, path);
                    var folder = System.IO.Path.GetDirectoryName(actualPath);
                    if (!System.IO.Directory.Exists(folder))
                        System.IO.Directory.CreateDirectory(folder);
                    System.IO.File.WriteAllBytes(actualPath, currentFile.Get(path));
                }
                MessageBox.Show("Extracted.");
            });
        }
    }
}
